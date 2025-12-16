# newsAi 🤖
> **Ultimate Multi-LLM Orchestrator**
> ChatGPT, Claude, Gemini를 단 하나의 창에서 동시에 제어하세요.

![Electron](https://img.shields.io/badge/Electron-Latest-blue?style=for-the-badge&logo=electron)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🔥 Why newsAi?

**"Why choose one model when you can check them all?"**

AI 모델마다 환각(Hallucination)이 있고 강점이 다릅니다. newsAi는 ChatGPT의 창의성, Claude의 문해력, Gemini의 검색 능력을 **동시에** 활용하여 교차 검증하고 최적의 답변을 도출할 수 있는 강력한 생산성 도구입니다.

단순한 웹 뷰어가 아닙니다. 각 서비스의 복잡한 DOM 구조와 상태 관리(React, ProseMirror 등)를 **Native Level에서 제어**하여, 마치 하나의 앱처럼 매끄러운 사용자 경험을 제공합니다.

## ✨ Key Features

### 🚀 Triple-View Architecture
- **3-Pane Split**: 화면 전환 없이 3대장 AI(ChatGPT, Claude, Gemini)를 한눈에 모니터링.
- **Unified Command Center**: 하단 통합 프롬프트 창에서 입력한 명령이 모든 Agent에게 동시 전송됩니다.

### 🛠️ Smart Injection Engine (SIE)
단순한 텍스트 복사/붙여넣기가 아닙니다. 각 플랫폼의 동작 방식을 역설계하여 완벽한 입력 호환성을 보장합니다.
- **ChatGPT**: React의 Virtual DOM 상태를 우회하는 **Prototype Value Setter** 기술 적용.
- **Claude**: ProseMirror 에디터의 무결성을 유지하며 **Ctrl+Enter** 시그널 시뮬레이션.
- **Gemini**: 비동기 UI 렌더링을 감지하여 정확한 타이밍에 **지능형 클릭 트리거**.

### 📰 Daily Briefing Automation
- **One-Click News**: "뉴스검색" 버튼 하나로 오늘(Today)의 한국 및 미국 주요 뉴스를 각 AI가 수집/요약합니다.
- 복잡한 프롬프트 엔지니어링 없이, 클릭 한 번으로 하루의 흐름을 파악하세요.

## 💻 Tech Stack & Philosophy

- **Core**: `Electron` (Chromium Context Isolation) & `Vanilla JavaScript`
  - *Why Vanilla?* 무거운 프레임워크 없이 오직 **속도와 반응성(Responsiveness)**에 집중했습니다.
- **Styling**: `CSS3` (Glassmorphism & Dark Theme)
  - 개발자의 눈 건강과 심미성을 고려한 프리미엄 다크 모드 디자인.
- **Automation**: Custom DOM Scripts
  - `document.execCommand`, `KeyboardEvent`, `Object.getOwnPropertyDescriptor` 등을 활용한 Low-level DOM 조작.

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/2hryul/newsAI.git

# 2. Enter directory
cd newsAI

# 3. Install dependencies
npm install

# 4. Run the orchestrator
npm start
```

## 🗓️ Roadmap

- [x] **Core Injection Logic**: Major 3 LLM Support Complete.
- [ ] **Auth Token Sync**: Chrome 로컬 쿠키 동기화를 통한 자동 로그인 (No more manual logins).
- [ ] **Global Shortcut**: `Alt+Space`로 언제든 호출 가능한 오버레이 모드.
- [ ] **Response Aggregation**: 3개 답변을 하나로 요약해주는 Meta-Agent 기능.

---

Crafted with 💻 and ☕ by **2hryul**
