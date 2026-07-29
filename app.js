const STORAGE_KEY = "gemini-nano-chat-history-v1";
const PREFERENCE_KEY = "gemini-nano-chat-preferences-v1";
const PROMPT_KEY = "gemini-nano-chat-system-prompt-v1";
const CAST_KEY = "gemini-nano-chat-story-cast-v1";
const STORY_BACKGROUND_KEY = "gemini-nano-chat-story-background-v1";
const DEFAULT_GREETING_TEXT = "こんにちは。ここで Gemini Nano に話しかけられます。";
const SYSTEM_PROMPT =
  "あなたは親切で簡潔な日本語アシスタントです。会話の流れを保ちながら、自然に返答してください。";
const DEFAULT_STORY_BACKGROUND =
  "舞台は、夕方の駅前と、淡い青色の扉が現れる不思議な世界です。";
const STORY_BACKGROUND_PRESETS = [
  {
    id: "modern",
    label: "現代",
    value: "舞台は、夕方の駅前と、日常に少しだけ不思議が混ざる現代です。",
  },
  {
    id: "magic",
    label: "魔法世界",
    value: "舞台は、魔法が日常に溶け込んだ世界で、駅前にも不思議な扉が現れます。",
  },
  {
    id: "sengoku",
    label: "戦国",
    value: "舞台は、戦国時代の町と山道で、刀や噂が物語の中心にあります。",
  },
  {
    id: "sf",
    label: "SF",
    value: "舞台は、近未来の駅前と、AIや端末が当たり前にあるSF世界です。",
  },
];
const DEFAULT_STORY_CAST = [
  {
    id: "mina",
    active: true,
    name: "ミナ",
    role: "案内役",
    personality: "明るく好奇心旺盛。場面を前に進める",
    speech: "親しみやすく自然。ユーザーに最初に声をかける",
  },
  {
    id: "rei",
    active: false,
    name: "レイ",
    role: "警戒役",
    personality: "落ち着いていて慎重。違和感を拾う",
    speech: "簡潔で少し冷静。危険や気になる点を指摘する",
  },
  {
    id: "shio",
    active: false,
    name: "シオ",
    role: "観察役",
    personality: "静かで観察眼が鋭い。細部をつなぐ",
    speech: "やわらかいが端的。手がかりや状況を整理する",
  },
];
const PERSONA_PRESETS = [
  {
    id: "default",
    label: "標準",
    description: "やさしい会話相手",
    prompt: SYSTEM_PROMPT,
  },
  {
    id: "coach",
    label: "作業コーチ",
    description: "整理して次を示す",
    prompt:
      "あなたは作業コーチです。ユーザーの話を整理し、結論、次の一手、注意点の順で短く答えてください。必要なら箇条書きを使ってください。",
  },
  {
    id: "reviewer",
    label: "レビュー係",
    description: "抜け漏れを見つける",
    prompt:
      "あなたは丁寧だが厳しめのレビュー係です。案の弱い点、足りない点、改善案を優先して返してください。良い点もひとこと添えてください。",
  },
  {
    id: "idea",
    label: "発想係",
    description: "広げてから絞る",
    prompt:
      "あなたはアイデア発想係です。まず選択肢を広げ、次におすすめ案を1つに絞って返してください。発想は具体的で、少し意外性のあるものを含めてください。",
  },
  {
    id: "story",
    label: "ゲームマスター",
    description: "固定キャラで進める",
    prompt:
      "あなたはゲームマスターです。物語の進行、場面転換、登場人物の描写を担当してください。固定メンバーはミナ、レイ、シオの3人です。各キャラクターの名前、役割、口調を毎回できるだけ維持してください。ミナは案内役、レイは警戒役、シオは観察役です。ユーザーの行動や感情は勝手に決めず、短い地の文と会話を混ぜてください。返答は通常2〜5文で、会話では固定キャラのうち少なくとも2人を登場させてください。最初の場面では3人全員を登場させてください。",
  },
  {
    id: "custom",
    label: "カスタム",
    description: "自分で編集する",
    prompt: "",
  },
];
const SESSION_OPTIONS = {
  expectedInputs: [
    {
      type: "text",
      languages: ["ja"],
    },
  ],
  expectedOutputs: [
    {
      type: "text",
      languages: ["ja"],
    },
  ],
};

const elements = {
  appCard: document.getElementById("appCard"),
  apiStatusChip: document.getElementById("apiStatusChip"),
  modelStatusChip: document.getElementById("modelStatusChip"),
  modeStatusChip: document.getElementById("modeStatusChip"),
  modeTabs: document.getElementById("modeTabs"),
  statusMessage: document.getElementById("statusMessage"),
  retryButton: document.getElementById("retryButton"),
  downloadButton: document.getElementById("downloadButton"),
  resetPersonaButton: document.getElementById("resetPersonaButton"),
  personaPills: document.getElementById("personaPills"),
  personaCustomInput: document.getElementById("personaCustomInput"),
  syncPromptButton: document.getElementById("syncPromptButton"),
  copyPromptButton: document.getElementById("copyPromptButton"),
  systemPromptInput: document.getElementById("systemPromptInput"),
  promptNote: document.getElementById("promptNote"),
  castList: document.getElementById("castList"),
  castNote: document.getElementById("castNote"),
  applyCastButton: document.getElementById("applyCastButton"),
  storyBackgroundPresetList: document.getElementById("storyBackgroundPresetList"),
  storyBackgroundInput: document.getElementById("storyBackgroundInput"),
  storyBackgroundNote: document.getElementById("storyBackgroundNote"),
  applyBackgroundButton: document.getElementById("applyBackgroundButton"),
  stopButton: document.getElementById("stopButton"),
  chatLog: document.getElementById("chatLog"),
  messageInput: document.getElementById("messageInput"),
  clearButton: document.getElementById("clearButton"),
  sendButton: document.getElementById("sendButton"),
  progressWrap: document.getElementById("progressWrap"),
  downloadProgress: document.getElementById("downloadProgress"),
  progressLabel: document.getElementById("progressLabel"),
};

const state = {
  messages: loadHistory(),
  persona: loadPersona(),
  systemPromptText: loadSystemPromptText(),
  promptNotice: "",
  mode: "mock",
  apiStatus: "未確認",
  modelStatus: "未確認",
  statusMessage: "ブラウザのAI機能を確認しています。",
  isPreparing: false,
  isSending: false,
  isDownloading: false,
  downloadPercent: 0,
  session: null,
  abortController: null,
  storyCast: loadStoryCast(),
  storyBackground: loadStoryBackground(),
};

initialize();

function initialize() {
  wireEvents();
  renderPersonaControls();
  renderCastProfiles();

  if (isStoryMode()) {
    resetStoryConversation();
    syncPromptFromPersona();
  }

  render();
  prepareRuntime();
}

function wireEvents() {
  elements.retryButton.addEventListener("click", () => {
    prepareRuntime();
  });

  elements.downloadButton.addEventListener("click", () => {
    void startModelDownload();
  });

  elements.resetPersonaButton.addEventListener("click", () => {
    setPersona({ presetId: "default", customPrompt: "" });
  });

  elements.personaCustomInput.addEventListener("input", (event) => {
    setPersona({
      presetId: "custom",
      customPrompt: event.target.value,
    });
  });

  elements.syncPromptButton.addEventListener("click", () => {
    syncPromptFromPersona();
  });

  elements.copyPromptButton.addEventListener("click", async () => {
    await copyCurrentPrompt();
  });

  elements.modeTabs?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest("[data-app-mode]");
    if (!(button instanceof HTMLElement)) {
      return;
    }

    const nextMode = button.dataset.appMode;
    if (nextMode === "story") {
      setPersona({
        presetId: "story",
        customPrompt: state.persona.customPrompt,
      });
    } else {
      setPersona({
        presetId: "default",
        customPrompt: "",
      });
    }
  });

  elements.systemPromptInput.addEventListener("input", (event) => {
    state.systemPromptText = event.target.value;
    state.promptNotice = "編集内容を保存しました。";
    saveSystemPromptText();
    renderPromptEditor();
  });

  elements.messageInput.addEventListener("input", () => {
    renderComposerState();
  });

  elements.castList?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest("[data-toggle-cast]");
    if (!(button instanceof HTMLElement)) {
      return;
    }

    const index = Number(button.dataset.toggleCast);
    toggleStoryCast(index);
  });

  elements.castList?.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const field = target.dataset.castField;
    const index = Number(target.dataset.castIndex);
    if (!field || Number.isNaN(index) || !state.storyCast[index]) {
      return;
    }

    state.storyCast[index][field] = target.value;
    saveStoryCast();
    state.promptNotice = "登場人物を保存しました。変更を反映してください。";
  });

  elements.applyCastButton?.addEventListener("click", () => {
    applyCastSettings();
  });

  elements.storyBackgroundPresetList?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest("[data-background-preset]");
    if (!(button instanceof HTMLElement)) {
      return;
    }

    const presetId = button.dataset.backgroundPreset;
    const preset = STORY_BACKGROUND_PRESETS.find((entry) => entry.id === presetId);
    if (!preset) {
      return;
    }

    state.storyBackground = preset.value;
    saveStoryBackground();
    renderStoryBackgroundEditor();
    state.promptNotice = `${preset.label} を背景に設定しました。`;
  });

  elements.storyBackgroundInput?.addEventListener("input", (event) => {
    state.storyBackground = event.target.value;
    saveStoryBackground();
    state.promptNotice = "物語背景を保存しました。反映すると次の物語に使われます。";
    renderStoryBackgroundEditor();
  });

  elements.applyBackgroundButton?.addEventListener("click", () => {
    applyBackgroundSettings();
  });

  elements.clearButton.addEventListener("click", () => {
    clearConversation();
    render();
    if (isStoryMode()) {
      void startStoryIfNeeded();
    }
  });

  elements.sendButton.addEventListener("click", () => {
    void handleSend();
  });

  elements.stopButton.addEventListener("click", () => {
    stopGeneration();
  });
}

async function prepareRuntime() {
  state.isPreparing = true;
  state.statusMessage = "利用可否を確認しています。";
  state.apiStatus = "確認中";
  state.modelStatus = "未確認";
  state.mode = "mock";
  state.isDownloading = false;
  state.downloadPercent = 0;
  render();

  try {
    const api = getLanguageModelApi();

    if (!api) {
      state.apiStatus = "非対応";
      state.modelStatus = "モック";
      state.mode = "mock";
      state.statusMessage =
        "この環境では Prompt API が見つからないため、モック応答に切り替えています。";
      render();
      return;
    }

    state.apiStatus = "検出済み";
    const availability = await api.availability(SESSION_OPTIONS);
    state.modelStatus = availability;

    if (availability === "available") {
      await createNativeSession(api);
    } else if (availability === "downloadable" || availability === "downloading") {
      state.mode = "native";
      state.statusMessage =
        "モデルは未準備です。『モデルを準備』を押すと、実際の取得を開始します。";
      state.isDownloading = availability === "downloading";
      state.downloadPercent = availability === "downloading" ? 1 : 0;
    } else {
      state.mode = "mock";
      state.statusMessage =
        "Gemini Nano はこの端末では利用できません。モック応答で動作します。";
    }
  } catch (error) {
    state.apiStatus = "エラー";
    state.modelStatus = "失敗";
    state.mode = "mock";
    state.statusMessage = formatError(error, "AI機能の初期化に失敗しました。");
  } finally {
    state.isPreparing = false;
    render();
    if (isStoryMode()) {
      void startStoryIfNeeded();
    }
  }
}

async function startModelDownload() {
  const api = getLanguageModelApi();

  if (!api) {
    state.statusMessage = "Prompt API が見つかりません。モック応答をご利用ください。";
    render();
    return;
  }

  state.isPreparing = true;
  state.isDownloading = true;
  state.downloadPercent = 0;
  state.statusMessage = "Gemini Nano のダウンロードを開始しています。";
  render();

  try {
    await createNativeSession(api, true);
  } catch (error) {
    state.apiStatus = "エラー";
    state.modelStatus = "失敗";
    state.mode = "mock";
    state.statusMessage = formatError(error, "モデルの取得に失敗しました。");
  } finally {
    state.isPreparing = false;
    state.isDownloading = false;
    render();
  }
}

function stopGeneration() {
  if (state.abortController) {
    state.abortController.abort();
  }

  state.statusMessage = "処理を中断しています。";
  render();
}

async function createNativeSession(api, withMonitor = false) {
  const sessionOptions = {
    ...SESSION_OPTIONS,
    systemPrompt: buildSystemPrompt(),
  };

  if (withMonitor) {
    sessionOptions.monitor = (monitor) => {
      monitor.addEventListener("downloadprogress", (event) => {
        const percent = Number.isFinite(event.loaded) ? event.loaded * 100 : 0;
        state.downloadPercent = Math.max(0, Math.min(100, percent));
        state.modelStatus = "downloading";
        state.statusMessage = "モデルをダウンロードしています。";
        render();
      });
    };
  }

  state.statusMessage = "Gemini Nano を初期化しています。";
  renderStatusOnly();

  state.session = await api.create(sessionOptions);
  state.mode = "native";
  state.modelStatus = "available";
  state.downloadPercent = 100;
  state.statusMessage = "Gemini Nano が利用可能です。会話を始められます。";
  render();
  await startStoryIfNeeded();
}

async function handleSend() {
  const text = elements.messageInput.value.trim();

  if (!text || state.isSending) {
    return;
  }

  const userMessage = createMessage("user", text);
  state.messages.push(userMessage);
  elements.messageInput.value = "";
  state.isSending = true;
  state.abortController = new AbortController();
  saveHistory();
  render();

  const assistantMessage = createMessage("assistant", "");
  state.messages.push(assistantMessage);
  render();

  try {
    const reply =
      state.mode === "native" && state.session
        ? await promptNative(text)
        : await promptMock(text);

    assistantMessage.text = sanitizeStoryReply(reply);
  } catch (error) {
    assistantMessage.role = "system";
    assistantMessage.text = isAbortError(error)
      ? "生成を中断しました。"
      : formatError(error, "返答を生成できませんでした。もう一度試してください。");
  } finally {
    state.isSending = false;
    state.abortController = null;
    saveHistory();
    render();
    scrollChatToBottom();
  }
}

async function promptNative(userText) {
  if (!state.session) {
    throw new Error("モデルセッションが準備されていません。");
  }

  const signal = state.abortController?.signal;
  state.statusMessage = "Gemini Nano が返答を作成しています。";
  renderStatusOnly();

  if (typeof state.session.promptStreaming === "function") {
    try {
      const stream = state.session.promptStreaming(userText, { signal });
      let output = "";
      for await (const chunk of stream) {
        output += chunk;
        updateStreamingAssistant(output);
      }

      state.statusMessage = "応答が届きました。";
      renderStatusOnly();
      return output.trim() || "返答を生成できませんでした。";
    } catch (error) {
      if (isAbortError(error)) {
        throw error;
      }

      throw error;
    }
  }

  const result = await state.session.prompt(userText, { signal });
  state.statusMessage = "応答が届きました。";
  renderStatusOnly();
  return String(result || "").trim() || "返答を生成できませんでした。";
}

async function startStoryIfNeeded() {
  if (!isStoryMode() || state.isPreparing || state.isSending) {
    return;
  }

  if (!isFreshConversation()) {
    return;
  }

  const opener = createStoryOpenerPrompt();
  const assistantMessage = createMessage("assistant", "");
  state.messages = [assistantMessage];
  state.isSending = true;
  state.abortController = new AbortController();
  render();

  try {
    const reply =
      state.mode === "native" && state.session
        ? await promptNative(opener)
        : await promptMock(opener);
    assistantMessage.text = sanitizeStoryReply(reply);
    state.statusMessage = "物語を始めました。続きを返してみてください。";
  } catch (error) {
    assistantMessage.role = "system";
    assistantMessage.text = isAbortError(error)
      ? "物語の開始を中断しました。"
      : formatError(error, "物語の開始に失敗しました。");
  } finally {
    state.isSending = false;
    state.abortController = null;
    saveHistory();
    render();
    scrollChatToBottom();
  }
}

async function promptMock(userText) {
  const signal = state.abortController?.signal;
  state.statusMessage = "モック応答を作成しています。";
  renderStatusOnly();
  await delay(450, signal);
  state.statusMessage = "モック応答を返しました。";
  renderStatusOnly();

  if (isStoryMode()) {
    return createMockStoryReply(userText);
  }

  return [
    "【モック応答】",
    `受け取りました: ${userText}`,
    "この端末では Gemini Nano が使えないため、雰囲気を確認するための応答です。",
  ].join("\n");
}

function updateStreamingAssistant(text) {
  const assistantMessage = [...state.messages].reverse().find((message) => message.role === "assistant" && message.text === "");
  if (assistantMessage) {
    assistantMessage.text = text;
    renderMessagesOnly();
    scrollChatToBottom();
  }
}

function render() {
  elements.apiStatusChip.textContent = `API: ${state.apiStatus}`;
  elements.modelStatusChip.textContent = `モデル: ${state.modelStatus}`;
  elements.modeStatusChip.textContent = `モード: ${state.mode === "native" ? "Gemini Nano" : "モック"}`;
  elements.statusMessage.textContent = state.statusMessage;
  elements.retryButton.disabled = state.isPreparing;
  elements.downloadButton.hidden = !(state.mode === "native" && !state.session && state.modelStatus !== "available");
  elements.downloadButton.disabled = state.isPreparing || state.isDownloading;
  elements.progressWrap.hidden = !state.isDownloading;
  elements.downloadProgress.value = state.downloadPercent;
  elements.progressLabel.textContent = state.isDownloading
    ? `ダウンロード中: ${Math.round(state.downloadPercent)}%`
    : "ダウンロード準備中";
  elements.stopButton.hidden = !state.isSending;
  elements.stopButton.disabled = !state.isSending;
  renderModeTabs();
  renderPersonaControls();
  renderCastProfiles();
  renderStoryBackgroundEditor();
  renderPromptEditor();
  renderComposerState();

  renderMessagesOnly();
  scrollChatToBottom();
}

function renderStatusOnly() {
  elements.apiStatusChip.textContent = `API: ${state.apiStatus}`;
  elements.modelStatusChip.textContent = `モデル: ${state.modelStatus}`;
  elements.modeStatusChip.textContent = `モード: ${state.mode === "native" ? "Gemini Nano" : "モック"}`;
  elements.statusMessage.textContent = state.statusMessage;
  elements.downloadButton.hidden = !(state.mode === "native" && !state.session && state.modelStatus !== "available");
  elements.downloadButton.disabled = state.isPreparing || state.isDownloading;
  elements.progressWrap.hidden = !state.isDownloading;
  elements.downloadProgress.value = state.downloadPercent;
  elements.progressLabel.textContent = state.isDownloading
    ? `ダウンロード中: ${Math.round(state.downloadPercent)}%`
    : "ダウンロード準備中";
  elements.stopButton.hidden = !state.isSending;
  elements.stopButton.disabled = !state.isSending;
  renderModeTabs();
}

function renderModeTabs() {
  if (!elements.appCard || !elements.modeTabs) {
    return;
  }

  const isStory = isStoryMode();
  elements.appCard.dataset.mode = isStory ? "story" : "chat";

  for (const button of elements.modeTabs.querySelectorAll("[data-app-mode]")) {
    if (!(button instanceof HTMLElement)) {
      continue;
    }

    button.dataset.active = button.dataset.appMode === (isStory ? "story" : "chat") ? "true" : "false";
  }
}

function renderComposerState() {
  elements.clearButton.disabled = state.isSending || state.isPreparing;
  elements.sendButton.disabled = state.isSending || !elements.messageInput.value.trim();
  elements.messageInput.disabled = state.isSending;
}

function renderPromptEditor() {
  if (!elements.systemPromptInput || !elements.promptNote) {
    return;
  }

  if (elements.systemPromptInput.value !== state.systemPromptText) {
    elements.systemPromptInput.value = state.systemPromptText;
  }

  const promptLength = state.systemPromptText.trim().length;
  elements.promptNote.textContent =
    state.promptNotice || `保存済みのプロンプトです。文字数: ${promptLength}`;
}

function renderCastProfiles() {
  if (!elements.castList || !elements.castNote) {
    return;
  }

  elements.castList.replaceChildren();

  state.storyCast.forEach((character, index) => {
    const card = document.createElement("article");
    card.className = "cast-card";
    card.innerHTML = `
      <div class="cast-card-head">
        <div>
          <p class="cast-name">${escapeHtml(character.name)}</p>
          <p class="cast-role">${escapeHtml(character.role)}</p>
        </div>
        <span class="cast-status ${character.active ? "active" : "inactive"}">
          ${character.active ? "登場中" : "追加候補"}
        </span>
      </div>
      <label class="cast-field">
        <span>名前</span>
        <input type="text" data-cast-field="name" data-cast-index="${index}" value="${escapeHtml(character.name)}" />
      </label>
      <label class="cast-field">
        <span>役割</span>
        <input type="text" data-cast-field="role" data-cast-index="${index}" value="${escapeHtml(character.role)}" />
      </label>
      <label class="cast-field">
        <span>特徴</span>
        <textarea rows="2" data-cast-field="personality" data-cast-index="${index}">${escapeHtml(character.personality)}</textarea>
      </label>
      <label class="cast-field">
        <span>話し方</span>
        <textarea rows="2" data-cast-field="speech" data-cast-index="${index}">${escapeHtml(character.speech)}</textarea>
      </label>
      <button class="ghost-button cast-copy" type="button" data-toggle-cast="${index}">
        ${character.active ? "外す" : "追加"}
      </button>
    `;
    elements.castList.append(card);
  });

  elements.castNote.textContent = "最初はミナだけが登場中です。追加を押すとレイやシオを物語へ足せます。";
}

function renderStoryBackgroundEditor() {
  if (!elements.storyBackgroundInput || !elements.storyBackgroundNote || !elements.storyBackgroundPresetList) {
    return;
  }

  if (elements.storyBackgroundInput.value !== state.storyBackground) {
    elements.storyBackgroundInput.value = state.storyBackground;
  }

  elements.storyBackgroundPresetList.replaceChildren();

  for (const preset of STORY_BACKGROUND_PRESETS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "persona-pill";
    button.dataset.backgroundPreset = preset.id;
    button.textContent = preset.label;
    elements.storyBackgroundPresetList.append(button);
  }

  const backgroundLength = state.storyBackground.trim().length;
  elements.storyBackgroundNote.textContent =
    state.promptNotice || `背景メモを保存できます。文字数: ${backgroundLength}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toggleStoryCast(index) {
  const target = state.storyCast[index];
  if (!target) {
    return;
  }

  const activeCount = state.storyCast.filter((character) => character.active).length;
  if (target.active && activeCount <= 1) {
    state.promptNotice = "少なくとも 1 人は必要です。";
    renderPromptEditor();
    return;
  }

  target.active = !target.active;
  saveStoryCast();
  applyCastSettings();
}

function renderPersonaControls() {
  if (!elements.personaPills || !elements.personaCustomInput) {
    return;
  }

  elements.personaPills.replaceChildren();

  for (const persona of PERSONA_PRESETS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "persona-pill";
    button.dataset.active = state.persona.presetId === persona.id ? "true" : "false";
    button.textContent = `${persona.label} · ${persona.description}`;
    button.addEventListener("click", () => {
      setPersona({
        presetId: persona.id,
        customPrompt: persona.id === "default" ? "" : state.persona.customPrompt,
      });
    });
    elements.personaPills.append(button);
  }

  if (elements.personaCustomInput.value !== state.persona.customPrompt) {
    elements.personaCustomInput.value = state.persona.customPrompt;
  }
}

function syncPromptFromPersona() {
  state.systemPromptText = buildPersonaPrompt();
  state.promptNotice = "人格からプロンプトを再生成しました。";
  saveSystemPromptText();
  renderPromptEditor();

  if (state.session || state.mode === "native") {
    state.session = null;
    state.mode = "native";
    state.statusMessage = "人格からプロンプトを再生成しました。もう一度モデルを準備すると反映されます。";
    render();
  }
}

async function copyCurrentPrompt() {
  try {
    await navigator.clipboard.writeText(state.systemPromptText);
    state.promptNotice = "プロンプトをコピーしました。";
  } catch {
    state.promptNotice = "コピーに失敗したので、欄から手動でコピーしてください。";
  }
  renderPromptEditor();
}

function renderMessagesOnly() {
  elements.chatLog.replaceChildren();

  if (state.messages.length === 0) {
    const empty = document.createElement("div");
    empty.className = "message-row system";
    empty.innerHTML = `
      <div class="message-bubble">
        ここに会話履歴が表示されます。ゲームマスターを選ぶと、最初の場面がここから始まります。
      </div>
    `;
    elements.chatLog.append(empty);
    return;
  }

  for (const message of state.messages) {
    const row = document.createElement("div");
    row.className = `message-row ${message.role}`;

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    if (message.role === "assistant" && message.text === "" && state.isSending) {
      bubble.innerHTML = `
        <span class="typing" aria-label="送信中">
          <span></span><span></span><span></span>
        </span>
      `;
    } else {
      bubble.textContent = message.text;
    }

    row.append(bubble);
    elements.chatLog.append(row);
  }
}

function createMessage(role, text) {
  return {
    id: crypto.randomUUID(),
    role,
    text,
    createdAt: new Date().toISOString(),
  };
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [createMessage("assistant", DEFAULT_GREETING_TEXT)];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("Invalid history");
    }

    return parsed.map((entry) => ({
      id: entry.id || crypto.randomUUID(),
      role: entry.role === "user" ? "user" : entry.role === "assistant" ? "assistant" : "system",
      text: String(entry.text || ""),
      createdAt: entry.createdAt || new Date().toISOString(),
    }));
  } catch {
    return [createMessage("assistant", DEFAULT_GREETING_TEXT)];
  }
}

function loadStoryCast() {
  try {
    const raw = localStorage.getItem(CAST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return normalizeStoryCast(parsed);
      }
    }
  } catch {
    // fall through to defaults
  }

  return normalizeStoryCast(DEFAULT_STORY_CAST);
}

function loadStoryBackground() {
  try {
    const raw = localStorage.getItem(STORY_BACKGROUND_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string" && parsed.trim()) {
        return parsed;
      }
    }
  } catch {
    // fall through to defaults
  }

  return DEFAULT_STORY_BACKGROUND;
}

function loadPersona() {
  try {
    const raw = localStorage.getItem(PREFERENCE_KEY);
    if (!raw) {
      return { presetId: "story", customPrompt: "" };
    }

    const parsed = JSON.parse(raw);
    return {
      presetId: PERSONA_PRESETS.some((persona) => persona.id === parsed.presetId)
        ? parsed.presetId
        : "default",
      customPrompt: String(parsed.customPrompt || ""),
    };
  } catch {
    return { presetId: "story", customPrompt: "" };
  }
}

function loadSystemPromptText() {
  try {
    const raw = localStorage.getItem(PROMPT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string" && parsed.trim()) {
        return parsed;
      }
    }
  } catch {
    // fall through to default prompt generation
  }

  return buildPersonaPrompt(loadPersona());
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages));
}

function savePersona() {
  localStorage.setItem(PREFERENCE_KEY, JSON.stringify(state.persona));
}

function saveSystemPromptText() {
  localStorage.setItem(PROMPT_KEY, JSON.stringify(state.systemPromptText));
}

function saveStoryCast() {
  localStorage.setItem(CAST_KEY, JSON.stringify(state.storyCast));
}

function saveStoryBackground() {
  localStorage.setItem(STORY_BACKGROUND_KEY, JSON.stringify(state.storyBackground));
}

function normalizeStoryCast(entries) {
  const fallback = DEFAULT_STORY_CAST;

  return fallback.map((defaultCharacter, index) => {
    const source = entries[index] || {};
    return {
      id: String(source.id || defaultCharacter.id || `cast-${index}`),
      active: typeof source.active === "boolean" ? source.active : index === 0,
      name: String(source.name || defaultCharacter.name),
      role: String(source.role || defaultCharacter.role),
      personality: String(source.personality || defaultCharacter.personality),
      speech: String(source.speech || defaultCharacter.speech),
    };
  });
}

function applyStoryContextSettings(message) {
  state.systemPromptText = buildPersonaPrompt();
  state.promptNotice = message;
  saveSystemPromptText();
  renderPromptEditor();

  if (isStoryMode()) {
    resetStoryConversation();
    state.mode = "native";
    render();
    void prepareRuntime();
  } else if (state.session || state.mode === "native") {
    destroySession();
    state.mode = "native";
    render();
  }
}

function applyCastSettings() {
  applyStoryContextSettings("登場人物の設定を保存しました。");
}

function applyBackgroundSettings() {
  applyStoryContextSettings("物語背景を保存しました。");
}

function setPersona(nextPersona) {
  state.persona = {
    presetId: nextPersona.presetId,
    customPrompt: nextPersona.customPrompt ?? "",
  };
  savePersona();
  renderPersonaControls();
  syncPromptFromPersona();

  if (nextPersona.presetId === "story") {
    resetStoryConversation();
    destroySession();
    state.statusMessage = "ゲームマスターを読み込み中です。新しい物語を始めます。";
    state.mode = "native";
    render();
    void prepareRuntime();
    return;
  }

  if (state.session || state.mode === "native") {
    destroySession();
    state.statusMessage = "人格を切り替えました。もう一度モデルを準備すると反映されます。";
    state.mode = "native";
    render();
  }
}

function destroySession() {
  if (state.session && typeof state.session.destroy === "function") {
    try {
      state.session.destroy();
    } catch {
      // Ignore destroy errors and continue resetting.
    }
  }

  state.session = null;
}

function buildSystemPrompt() {
  return state.systemPromptText.trim() || buildPersonaPrompt();
}

function buildPersonaPrompt(persona = state.persona) {
  const preset =
    PERSONA_PRESETS.find((item) => item.id === persona.presetId) || PERSONA_PRESETS[0];
  const custom = persona.customPrompt.trim();
  const castList = getActiveStoryCast();
  const background = state.storyBackground.trim() || DEFAULT_STORY_BACKGROUND;

  if (preset.id === "custom") {
    return custom || SYSTEM_PROMPT;
  }

  if (preset.id === "story") {
    return [
      preset.prompt,
      "",
      "固定キャラ定義:",
      ...castList.map(
        (character) =>
          `- ${character.name}: ${character.role}。${character.personality}。話し方: ${character.speech}`
      ),
      "",
      `物語背景: ${background}`,
      "",
      "追加ルール:",
      "- 最初の返答では、舞台を短く示してから、固定キャラ全員を自然に登場させる",
      "- 2回目以降の返答でも、固定キャラのうち少なくとも2人を登場させる",
      "- 新しい登場人物をむやみに増やさない",
      "- ユーザーの名前や行動を勝手に確定しない",
      "- 会話を通じて物語を少しずつ進める",
    ].join("\n");
  }

  if (!custom || preset.id === "default") {
    return preset.prompt || SYSTEM_PROMPT;
  }

  return `${preset.prompt}\n\n追加の指示:\n${custom}`;
}

function getLanguageModelApi() {
  return window.LanguageModel || window.ai?.languageModel || null;
}

function createStoryOpenerPrompt() {
  const castList = getActiveStoryCast();
  const background = state.storyBackground.trim() || DEFAULT_STORY_BACKGROUND;

  return [
    "ゲームマスターとして物語を開始してください。",
    "最初の返答では、短い情景描写から始めて、今有効になっている登場人物を自然に登場させてください。",
    "2回目以降の返答でも、追加した登場人物のうち少なくとも2人を登場させてください。",
    "登場人物は固定メンバーとして扱い、名前・口調・役割をこの先も維持してください。",
    `固定キャラ: ${castList.map((character) => character.name).join(" / ")}`,
    `物語背景: ${background}`,
    "ユーザーの行動や感情は決めつけず、会話が自然に続く短い余韻で締めてください。",
    "返答は日本語で、2〜5文程度にしてください。",
  ].join("\n");
}

function getActiveStoryCast() {
  const activeCast = state.storyCast.filter((character) => character.active);
  return activeCast.length > 0 ? activeCast : state.storyCast.slice(0, 1);
}

function resetStoryConversation() {
  clearConversation();
  destroySession();
  state.abortController = null;
  state.isSending = false;
  state.statusMessage = "ゲームマスターを読み込み中です。新しい物語を始めます。";
}

function clearConversation() {
  state.messages = [];
  saveHistory();
}

function sanitizeStoryReply(text) {
  const value = String(text || "").trim();

  if (!isStoryMode()) {
    return value;
  }

  const cleaned = value
    .replace(/[「『]?(?:どうしますか|何をしますか|どうする|何をする)[？?][」』]?/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (cleaned) {
    return cleaned;
  }

  return "ミナは淡い青色の扉を見つめた。静かな気配だけが、次の一歩を待っている。";
}

function createMockStoryReply(userText) {
  const trimmed = String(userText || "").trim();
  const activeCast = getActiveStoryCast();
  const [first, second, third] = activeCast;

  return [
    "【モック物語】",
    trimmed
      ? `${first?.name || "ミナ"}が小さくうなずく。「${trimmed}、だね。」`
      : `${first?.name || "ミナ"}が振り返り、淡い青色の扉を指さした。`,
    second
      ? `${second.name}は周囲を見回し、${third ? `${third.name}は扉の縁に残る光を静かに追っている。` : "足元の気配を静かに探っている。"}`
      : "静かな空気が、扉の向こうの気配を引き立てている。",
    "物語はここから、ゆっくり進み始める。",
  ].join("\n");
}

function isStoryMode() {
  return state.persona.presetId === "story";
}

function isFreshConversation() {
  if (state.messages.length === 0) {
    return true;
  }

  if (state.messages.length === 1) {
    const onlyMessage = state.messages[0];
    return (
      onlyMessage.role === "assistant" &&
      onlyMessage.text.trim() === DEFAULT_GREETING_TEXT
    );
  }

  return false;
}

function isAbortError(error) {
  return error instanceof DOMException
    ? error.name === "AbortError"
    : error && typeof error === "object" && "name" in error && error.name === "AbortError";
}

function scrollChatToBottom() {
  requestAnimationFrame(() => {
    elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
  });
}

function formatError(error, fallback) {
  if (error instanceof Error && error.message) {
    return `${fallback}\n${error.message}`;
  }

  return fallback;
}

function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      window.clearTimeout(timeoutId);
      signal?.removeEventListener("abort", onAbort);
      reject(new DOMException("The operation was aborted.", "AbortError"));
    }

    if (signal?.aborted) {
      onAbort();
      return;
    }

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}
