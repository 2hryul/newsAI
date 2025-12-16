const { ipcRenderer } = require('electron');

const webviews = {
    chatgpt: document.getElementById('chatgpt'),
    claude: document.getElementById('claude'),
    gemini: document.getElementById('gemini')
};

const promptInput = document.getElementById('prompt-input');
const sendBtn = document.getElementById('send-btn');
const newsBtn = document.getElementById('news-btn');

// Helper to get current date
function getTodayDate() {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Injection Scripts
const SCRIPTS = {
    chatgpt: (text) => `
        (function() {
            function setNativeValue(element, value) {
                const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
                const prototype = Object.getPrototypeOf(element);
                const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
                
                if (valueSetter && valueSetter !== prototypeValueSetter) {
                    prototypeValueSetter.call(element, value);
                } else {
                    valueSetter.call(element, value);
                }
                element.dispatchEvent(new Event('input', { bubbles: true }));
            }

            const target = document.querySelector('#prompt-textarea') || document.querySelector('div[contenteditable="true"]');
            
            if (target) {
                target.focus();
                if (target.tagName === 'TEXTAREA') {
                    setNativeValue(target, \`${text}\`);
                } else {
                    // Contenteditable div fallback
                    document.execCommand('insertText', false, \`${text}\`);
                }
                
                setTimeout(() => {
                    const btn = document.querySelector('button[data-testid="send-button"]');
                    if (btn) btn.click();
                }, 500);
            }
        })();
    `,
    claude: (text) => `
        (function() {
            // 1. Try to start a new chat to clear history (if requested via News Search)
            const newChatBtn = document.querySelector('a[href="/new"]') || document.querySelector('button[aria-label="New Chat"]');
            if (newChatBtn) {
                 // Optional: Click new chat if needed, but might cause reload. Skipping for stability.
            }

            const editor = document.querySelector('div[contenteditable="true"]');
            if (editor) {
                editor.focus();
                
                // Method 1: execCommand (Standard)
                document.execCommand('insertText', false, \`${text}\`);
                
                // Method 2: Fallback if empty (Direct textContent + Input Event)
                if (!editor.textContent.trim()) {
                    editor.textContent = \`${text}\`;
                    editor.dispatchEvent(new Event('input', { bubbles: true }));
                }
                
                setTimeout(() => {
                    // Try Ctrl + Enter (as requested by user)
                    const keyObj = { 
                        bubbles: true, 
                        cancelable: true, 
                        keyCode: 13, 
                        key: 'Enter', 
                        code: 'Enter',
                        ctrlKey: true, // Critical: Add Ctrl modifier
                        metaKey: true  // Add Meta for Mac support just in case
                    };
                    editor.dispatchEvent(new KeyboardEvent('keydown', keyObj));
                    editor.dispatchEvent(new KeyboardEvent('keyup', keyObj));

                    // Fallback to button click
                    setTimeout(() => {
                        const btn = document.querySelector('button[aria-label="Send Message"]') || 
                                  document.querySelector('button[aria-label="Send"]') ||
                                  document.querySelector('button[aria-label*="Send"]') ||
                                  document.querySelector('div[aria-label="Send Message"]');
                        
                        // NOTE: Removed generic SVG selector as it was clicking the Sidebar Toggle button
                        
                        if (btn) btn.click();
                    }, 300);
                }, 300);
            }
        })();
    `,
    gemini: (text) => `
        (function() {
            const editor = document.querySelector('div[role="textbox"]');
            if (editor) {
                editor.focus();
                document.execCommand('insertText', false, \`${text}\`);
                
                // Wait for UI to update (button to become active)
                setTimeout(() => {
                    const btn = document.querySelector('button[aria-label="Send message"]') || 
                              document.querySelector('button[aria-label="보내기"]') || 
                              document.querySelector('button[aria-label="메시지 보내기"]') ||
                              document.querySelector('button[aria-label="제출"]') ||
                              document.querySelector('button[aria-label="전송"]') ||
                              document.querySelector('button[class*="send-button"]');
                    
                    if (btn) {
                        // Ensure we don't click a "Stop" button if it appeared
                        const label = btn.getAttribute('aria-label');
                        if (label && (label.includes('Stop') || label.includes('중지'))) {
                            return; 
                        }
                        btn.click();
                    }
                }, 800); // Increased delay to ensure state is settled
            }
        })();
    `
};

function sendToAll(text) {
    if (!text) return;

    // ChatGPT
    try {
        webviews.chatgpt.executeJavaScript(SCRIPTS.chatgpt(text));
    } catch (e) { console.error('ChatGPT Error:', e); }

    // Claude
    try {
        webviews.claude.executeJavaScript(SCRIPTS.claude(text));
    } catch (e) { console.error('Claude Error:', e); }

    // Gemini
    try {
        webviews.gemini.executeJavaScript(SCRIPTS.gemini(text));
    } catch (e) { console.error('Gemini Error:', e); }
}

sendBtn.addEventListener('click', () => {
    const text = promptInput.value;
    sendToAll(text);
    promptInput.value = ''; // Clear input
});

newsBtn.addEventListener('click', () => {
    const date = getTodayDate();
    const prompt = `오늘(${date})의 한국과 미국의 주요 뉴스 5가지를 각각 찾아서 간략하게 요약해 주세요.`;
    promptInput.value = prompt; // Show in input
    sendToAll(prompt);
    promptInput.value = '';
});
