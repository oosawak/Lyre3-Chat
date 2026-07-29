const STORAGE_KEY = "gemini-nano-chat-history-v1";
const PREFERENCE_KEY = "gemini-nano-chat-preferences-v1";
const PROMPT_KEY = "gemini-nano-chat-system-prompt-v1";
const CAST_KEY = "gemini-nano-chat-story-cast-v1";
const STORY_BACKGROUND_KEY = "gemini-nano-chat-story-background-v1";
const MOCK_STORY_OPENER_KEY = "gemini-nano-chat-mock-story-opener-v1";
const PLAYER_NAME_KEY = "gemini-nano-chat-player-name-v1";
const DEFAULT_GREETING_TEXT = "こんにちは。ここで Gemini Nano に話しかけられます。";
const SYSTEM_PROMPT =
  "あなたは親切で簡潔な日本語アシスタントです。会話の流れを保ちながら、自然に返答してください。";
const DEFAULT_STORY_BACKGROUND =
  "舞台は、夕暮れの駅前と、淡い青色の扉が現れる不思議な世界です。";
const STORY_BACKGROUND_PRESETS = [
  {
    id: "twilight_station",
    label: "夕暮れの駅前",
    value: "舞台は、夕暮れの駅前。日常のすぐ隣に、まだ誰も気づいていない扉がひとつあります。",
  },
  {
    id: "rain_port",
    label: "雨の港町",
    value: "舞台は、潮の匂いが残る雨の港町。濡れた石畳の先で、噂と約束が交差します。",
  },
  {
    id: "castle_town",
    label: "城下町",
    value: "舞台は、武家屋敷と路地が入り組む城下町。噂話と人情が物語を動かします。",
  },
  {
    id: "neon_overpass",
    label: "近未来の高架都市",
    value: "舞台は、光る高架と端末の灯りが行き交う近未来都市。少し先の便利さの裏で、小さな異変が起きています。",
  },
  {
    id: "magic_academy",
    label: "魔法学園",
    value: "舞台は、古い塔と庭園のある魔法学園。授業の合間に、不思議な出来事が起きやすい場所です。",
  },
  {
    id: "desert_trade",
    label: "砂漠の交易路",
    value: "舞台は、砂漠を越える交易路。行商人の噂、旅の記録、忘れられた遺跡が手がかりになります。",
  },
];
const STORY_OPENING_LINES = {
  station: [
    "夕暮れの駅前で、{background}",
    "改札の明かりがにじむころ、{background}",
    "ホームのざわめきが遠のいたあたりで、{background}",
  ],
  port: [
    "雨の港町で、{background}",
    "潮の匂いが残る路地の先で、{background}",
    "波音が低く響くなか、{background}",
  ],
  castle: [
    "城下町の路地で、{background}",
    "武家屋敷の影が伸びるころ、{background}",
    "夕餉の支度が始まる城下で、{background}",
  ],
  future: [
    "近未来の高架都市で、{background}",
    "端末の光が行き交う通りで、{background}",
    "高架の影が落ちる歩道で、{background}",
  ],
  academy: [
    "魔法学園の中庭で、{background}",
    "古い塔の鐘が鳴るころ、{background}",
    "授業終わりの回廊で、{background}",
  ],
  desert: [
    "砂漠の交易路で、{background}",
    "風が砂を運ぶ道の先で、{background}",
    "遠い遺跡の影をたどる旅路で、{background}",
  ],
  default: [
    "静かな夕方、{background}",
    "少しだけ不思議な空気の中で、{background}",
    "見慣れた景色のすぐ隣で、{background}",
  ],
};
const STORY_SPOTLIGHT_LINES = {
  station: [
    "{first}が一歩前に出て、扉の気配を確かめる。{second}と{third}は、少し離れて周囲の気配を受け止めている。",
    "{first}が声をひそめると、{second}が改札の向こうを見やり、{third}は扉の縁に残る光を追った。",
    "{first}の合図で、{second}が視線を上げ、{third}は静かに頷いた。",
  ],
  port: [
    "{first}が雨粒を払い、港の向こうを指さす。{second}は岸壁を見張り、{third}は足元の濡れた石畳を確かめている。",
    "{first}が低く呼びかけると、{second}が船着き場を見やり、{third}は潮風の中の違和感を拾い上げた。",
    "{first}が前に出て、{second}と{third}が静かにその背を支えている。",
  ],
  castle: [
    "{first}が路地の先を気にかけ、{second}が屋敷の影を見張る。{third}は噂の断片を拾っている。",
    "{first}が小さく手招きすると、{second}が刀の位置を整え、{third}は人の流れを読む。",
    "{first}の言葉に、{second}がうなずき、{third}は周囲の空気を測っている。",
  ],
  future: [
    "{first}が端末の表示を見て、{second}が高架の上を見上げる。{third}は通信の乱れを追っている。",
    "{first}が一歩踏み出すと、{second}が周囲を警戒し、{third}はノイズの混ざった声を聞き分けた。",
    "{first}の合図で、{second}と{third}が同時に視線を上げた。",
  ],
  academy: [
    "{first}が中庭を見渡し、{second}が本を抱え直す。{third}は塔の影に残る気配を追っている。",
    "{first}が声をかけると、{second}が笑い、{third}は静かに花壇の先を見つめた。",
    "{first}の背後で、{second}と{third}が不思議な兆しを確かめている。",
  ],
  desert: [
    "{first}が地図を広げ、{second}が風向きを読む。{third}は遠くの遺跡を見失わないよう目を凝らした。",
    "{first}が足を止めると、{second}が砂の跡をなぞり、{third}は交易路の先を見張った。",
    "{first}の一言で、{second}と{third}が同時に周囲へ目を走らせた。",
  ],
  default: [
    "{first}が静かに周囲を見回し、{second}と{third}はその視線の先を追っている。",
    "{first}が小さくうなずき、{second}が周囲の違和感を拾い、{third}は無言で空気を読む。",
    "{first}が前に出ると、{second}と{third}が少し遅れて続いた。",
  ],
};
const STORY_CLOSING_LINES = {
  station: [
    "物語は、改札の向こうへ続いていく。",
    "静かな駅前に、次の気配だけが残っていた。",
    "その扉が開くかどうかは、まだ誰にも分からない。",
  ],
  port: [
    "潮風の向こうに、次の手がかりが待っている。",
    "港の夜は、まだ始まったばかりだった。",
    "濡れた石畳の先に、物語が続いている。",
  ],
  castle: [
    "城下町の噂は、もう次の角へ伸びていた。",
    "静かな路地の奥で、何かが動き出している。",
    "人の気配が途切れた先に、次の一幕がある。",
  ],
  future: [
    "高架の灯りの先で、まだ見ぬ異変が息をしている。",
    "都市のノイズの中に、細い手がかりが混ざっていた。",
    "少し先の便利さの裏で、物語は静かに進む。",
  ],
  academy: [
    "塔の鐘が止むころ、次の不思議が顔を出す。",
    "学園の静けさの奥で、何かが待っている。",
    "夕方の回廊に、まだ言葉にならない気配が残った。",
  ],
  desert: [
    "砂の向こうに、まだ続きの道がある。",
    "遺跡の影が伸びる先で、物語は静かに続く。",
    "交易路の風は、次の場所を知らせていた。",
  ],
  default: [
    "静かな余韻だけが、場面の続きを待っている。",
    "物語はここから、ゆっくり続いていく。",
    "次の一歩は、まだ白紙のままだ。",
  ],
};
const STORY_CAST_VARIANTS = {
  station: [
    [
      {
        name: "ミナ",
        role: "案内役",
        personality: "明るく好奇心旺盛。場面を前に進める",
        speech: "親しみやすく自然。最初に状況を開く",
      },
      {
        name: "レイ",
        role: "警戒役",
        personality: "落ち着いていて慎重。違和感を拾う",
        speech: "簡潔で冷静。周囲の変化にすぐ気づく",
      },
      {
        name: "シオ",
        role: "観察役",
        personality: "静かで観察眼が鋭い。細部をつなぐ",
        speech: "やわらかいが端的。気配や手がかりをまとめる",
      },
    ],
    [
      {
        name: "マヒル",
        role: "案内役",
        personality: "明るく軽やか。場をほぐす",
        speech: "少し砕けた自然な日本語。話を前に進める",
      },
      {
        name: "ユウ",
        role: "警戒役",
        personality: "慎重で観察好き。小さな変化を見逃さない",
        speech: "短く落ち着いた口調。危険や違和感を先に伝える",
      },
      {
        name: "カナ",
        role: "観察役",
        personality: "静かでやさしい。場の空気を読む",
        speech: "穏やかで端的。背景や気配を整理する",
      },
    ],
    [
      {
        name: "ナギ",
        role: "案内役",
        personality: "テンポがよく前向き。状況を動かす",
        speech: "柔らかく親しみやすい。最初のひと言が得意",
      },
      {
        name: "カイ",
        role: "警戒役",
        personality: "少しぶっきらぼうだが面倒見がいい",
        speech: "短く、要点をはっきり伝える",
      },
      {
        name: "リク",
        role: "観察役",
        personality: "冷静で記憶力がいい。細かな違いを覚える",
        speech: "穏やかで少し知的。状況を淡々と整理する",
      },
    ],
  ],
  port: [
    [
      {
        name: "ノア",
        role: "案内役",
        personality: "朗らかで柔らかい。波に乗るように進める",
        speech: "穏やかで少し詩的。会話をなめらかにつなぐ",
      },
      {
        name: "ソラ",
        role: "警戒役",
        personality: "潮の変化に敏感で慎重",
        speech: "短く落ち着いた口調。違和感を先に示す",
      },
      {
        name: "ミオ",
        role: "観察役",
        personality: "人の表情や小物の違いをよく見る",
        speech: "やさしく端的。見たものを静かに伝える",
      },
    ],
    [
      {
        name: "アオイ",
        role: "案内役",
        personality: "落ち着いていて親しみやすい。人を導くのがうまい",
        speech: "穏やかで自然。先へ進む道筋を示す",
      },
      {
        name: "レン",
        role: "警戒役",
        personality: "潮風や船の揺れに敏感。危なさを先に読む",
        speech: "短くはっきり。注意点を簡潔に伝える",
      },
      {
        name: "ミオ",
        role: "観察役",
        personality: "小物や人の表情に気づきやすい",
        speech: "やさしく端的。現場の様子を静かにまとめる",
      },
    ],
    [
      {
        name: "ユナ",
        role: "案内役",
        personality: "少しおっとりしているが、場を和ませる",
        speech: "柔らかく親しみやすい。話の入口を作る",
      },
      {
        name: "カイ",
        role: "警戒役",
        personality: "無口だが頼れる。船着き場の危険に強い",
        speech: "一言で要点を伝える。少し渋め",
      },
      {
        name: "サラ",
        role: "観察役",
        personality: "記録好きで、見たことをすぐメモする",
        speech: "静かで丁寧。状況を整えて返す",
      },
    ],
  ],
  castle: [
    [
      {
        name: "サク",
        role: "案内役",
        personality: "気さくで勢いがある。人と人をつなぐ",
        speech: "明るく自然。先へ進むための一言が早い",
      },
      {
        name: "トワ",
        role: "警戒役",
        personality: "慎重で用心深い。筋の通らない話を嫌う",
        speech: "簡潔で少し厳しめ。危うさを見抜く",
      },
      {
        name: "ヒナ",
        role: "観察役",
        personality: "静かに見て考える。人情にも強い",
        speech: "穏やかで端的。状況を整理して言う",
      },
    ],
    [
      {
        name: "コト",
        role: "案内役",
        personality: "元気で人懐っこい。城下町の道に詳しい",
        speech: "明るく自然。最初のひと言が得意",
      },
      {
        name: "タケル",
        role: "警戒役",
        personality: "不器用だが真面目。怪しい噂にすぐ反応する",
        speech: "短く落ち着いた口調。警戒の言葉が早い",
      },
      {
        name: "ユイ",
        role: "観察役",
        personality: "静かで人の流れを読むのがうまい",
        speech: "やさしく静か。場の変化を淡々と伝える",
      },
    ],
    [
      {
        name: "サク",
        role: "案内役",
        personality: "気さくで勢いがある。人と人をつなぐ",
        speech: "明るく自然。先へ進むための一言が早い",
      },
      {
        name: "トワ",
        role: "警戒役",
        personality: "慎重で用心深い。筋の通らない話を嫌う",
        speech: "簡潔で少し厳しめ。危うさを見抜く",
      },
      {
        name: "ヒナ",
        role: "観察役",
        personality: "静かに見て考える。人情にも強い",
        speech: "穏やかで端的。状況を整理して言う",
      },
    ],
  ],
  future: [
    [
      {
        name: "ルク",
        role: "案内役",
        personality: "軽快で機械に強い。状況にすぐ乗る",
        speech: "明るくテンポよく。先の動きを提案する",
      },
      {
        name: "ソウ",
        role: "警戒役",
        personality: "冷静で解析が得意。変化を数で見る",
        speech: "短く機能的。危険や異常をすぐ伝える",
      },
      {
        name: "ユイ",
        role: "観察役",
        personality: "静かで情報を拾うのがうまい",
        speech: "やわらかく簡潔。ノイズの中から手がかりを抜く",
      },
    ],
    [
      {
        name: "リオ",
        role: "案内役",
        personality: "機器の扱いに慣れた、少し軽口の多い案内役",
        speech: "テンポよく、でも要点は外さない",
      },
      {
        name: "ソウ",
        role: "警戒役",
        personality: "冷静で解析が得意。変化を数で見る",
        speech: "短く機能的。危険や異常をすぐ伝える",
      },
      {
        name: "ユイ",
        role: "観察役",
        personality: "静かで情報を拾うのがうまい",
        speech: "やわらかく簡潔。ノイズの中から手がかりを抜く",
      },
    ],
    [
      {
        name: "ルク",
        role: "案内役",
        personality: "軽快で機械に強い。状況にすぐ乗る",
        speech: "明るくテンポよく。先の動きを提案する",
      },
      {
        name: "ミナト",
        role: "警戒役",
        personality: "少し無口だが、都市の異常を見逃さない",
        speech: "短く落ち着いた口調。危険やノイズを示す",
      },
      {
        name: "カノン",
        role: "観察役",
        personality: "静かで記録が得意。端末ログに強い",
        speech: "やわらかく端的。観測結果を整理する",
      },
    ],
  ],
  academy: [
    [
      {
        name: "エマ",
        role: "案内役",
        personality: "好奇心旺盛で元気。学園の空気を動かす",
        speech: "明るく親しみやすい。話の入口を作る",
      },
      {
        name: "リオ",
        role: "警戒役",
        personality: "知識豊富で慎重。危険な呪文を警戒する",
        speech: "落ち着いて端的。危ない兆しを指摘する",
      },
      {
        name: "メイ",
        role: "観察役",
        personality: "静かで書き留めるのが得意",
        speech: "穏やかで丁寧。見たことを整えて返す",
      },
    ],
    [
      {
        name: "メイ",
        role: "案内役",
        personality: "明るく面倒見がいい。授業や校内の案内に強い",
        speech: "親しみやすく自然。場をほぐす",
      },
      {
        name: "リツ",
        role: "警戒役",
        personality: "魔法理論にうるさく、危険な術式を警戒する",
        speech: "短く鋭い。危うい点を先に言う",
      },
      {
        name: "ノエ",
        role: "観察役",
        personality: "静かで本好き。細かな異変を拾う",
        speech: "やさしく端的。観察したことを整理する",
      },
    ],
    [
      {
        name: "エマ",
        role: "案内役",
        personality: "好奇心旺盛で元気。学園の空気を動かす",
        speech: "明るく親しみやすい。話の入口を作る",
      },
      {
        name: "リオ",
        role: "警戒役",
        personality: "知識豊富で慎重。危険な呪文を警戒する",
        speech: "落ち着いて端的。危ない兆しを指摘する",
      },
      {
        name: "メイ",
        role: "観察役",
        personality: "静かで書き留めるのが得意",
        speech: "穏やかで丁寧。見たことを整えて返す",
      },
    ],
  ],
  desert: [
    [
      {
        name: "ハル",
        role: "案内役",
        personality: "旅慣れしていて頼れる。先導がうまい",
        speech: "柔らかく自然。旅の流れを作る",
      },
      {
        name: "レオ",
        role: "警戒役",
        personality: "足元と天候に敏感。無駄がない",
        speech: "短く端的。危険や疲れを先に言う",
      },
      {
        name: "サラ",
        role: "観察役",
        personality: "記録好きで地図に強い",
        speech: "やさしく静か。道筋や遺跡の手がかりをまとめる",
      },
    ],
    [
      {
        name: "ハル",
        role: "案内役",
        personality: "旅慣れしていて頼れる。先導がうまい",
        speech: "柔らかく自然。旅の流れを作る",
      },
      {
        name: "レオ",
        role: "警戒役",
        personality: "足元と天候に敏感。無駄がない",
        speech: "短く端的。危険や疲れを先に言う",
      },
      {
        name: "サラ",
        role: "観察役",
        personality: "記録好きで地図に強い",
        speech: "やさしく静か。道筋や遺跡の手がかりをまとめる",
      },
    ],
    [
      {
        name: "ソル",
        role: "案内役",
        personality: "陽気で砂漠慣れした旅人",
        speech: "明るく軽やか。旅の次の一歩を示す",
      },
      {
        name: "シエラ",
        role: "警戒役",
        personality: "慎重で観測が細かい。砂嵐に敏感",
        speech: "短く落ち着いた口調。危険を先に言う",
      },
      {
        name: "カナ",
        role: "観察役",
        personality: "静かで記録を欠かさない",
        speech: "やわらかく端的。地形や足跡を整理する",
      },
    ],
  ],
  default: [
    [
      {
        name: "ミナ",
        role: "案内役",
        personality: "明るく好奇心旺盛。場面を前に進める",
        speech: "親しみやすく自然。ユーザーに最初に声をかける",
      },
      {
        name: "レイ",
        role: "警戒役",
        personality: "落ち着いていて慎重。違和感を拾う",
        speech: "簡潔で少し冷静。危険や気になる点を指摘する",
      },
      {
        name: "シオ",
        role: "観察役",
        personality: "静かで観察眼が鋭い。細部をつなぐ",
        speech: "やわらかいが端的。手がかりや状況を整理する",
      },
    ],
    [
      {
        name: "マヒル",
        role: "案内役",
        personality: "明るく軽やか。場をほぐす",
        speech: "少し砕けた自然な日本語。話を前に進める",
      },
      {
        name: "ユウ",
        role: "警戒役",
        personality: "慎重で観察好き。小さな変化を見逃さない",
        speech: "短く落ち着いた口調。危険や違和感を先に伝える",
      },
      {
        name: "カナ",
        role: "観察役",
        personality: "静かでやさしい。場の空気を読む",
        speech: "穏やかで端的。背景や気配を整理する",
      },
    ],
    [
      {
        name: "ナギ",
        role: "案内役",
        personality: "テンポがよく前向き。状況を動かす",
        speech: "柔らかく親しみやすい。最初のひと言が得意",
      },
      {
        name: "カイ",
        role: "警戒役",
        personality: "少しぶっきらぼうだが面倒見がいい",
        speech: "短く、要点をはっきり伝える",
      },
      {
        name: "リク",
        role: "観察役",
        personality: "冷静で記憶力がいい。細かな違いを覚える",
        speech: "穏やかで少し知的。状況を淡々と整理する",
      },
    ],
  ],
};
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
  playerNameInput: document.getElementById("playerNameInput"),
  playerNameNote: document.getElementById("playerNameNote"),
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
  randomCastButton: document.getElementById("randomCastButton"),
  storyBackgroundPresetList: document.getElementById("storyBackgroundPresetList"),
  storyBackgroundInput: document.getElementById("storyBackgroundInput"),
  storyBackgroundNote: document.getElementById("storyBackgroundNote"),
  applyBackgroundButton: document.getElementById("applyBackgroundButton"),
  mockStoryOpenerRandomButton: document.getElementById("mockStoryOpenerRandomButton"),
  mockStoryOpenerBackgroundButton: document.getElementById("mockStoryOpenerBackgroundButton"),
  mockStoryOpenerInput: document.getElementById("mockStoryOpenerInput"),
  mockStoryOpenerNote: document.getElementById("mockStoryOpenerNote"),
  stopButton: document.getElementById("stopButton"),
  chatLog: document.getElementById("chatLog"),
  messageInput: document.getElementById("messageInput"),
  clearButton: document.getElementById("clearButton"),
  sendButton: document.getElementById("sendButton"),
  progressWrap: document.getElementById("progressWrap"),
  downloadProgress: document.getElementById("downloadProgress"),
  progressLabel: document.getElementById("progressLabel"),
};

const initialPersona = loadPersona();
const initialStoryCast = loadStoryCast();
const initialStoryBackground = loadStoryBackground();
const initialMockStoryOpener = loadMockStoryOpener();
const initialPlayerName = loadPlayerName();

const state = {
  messages: loadHistory(),
  persona: initialPersona,
  systemPromptText: "",
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
  storyCast: initialStoryCast,
  storyBackground: initialStoryBackground,
  mockStoryOpener: initialMockStoryOpener,
  playerName: initialPlayerName,
};

state.systemPromptText = loadSystemPromptText(
  state.persona,
  state.storyBackground,
  state.storyCast,
  state.playerName
);

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

  elements.playerNameInput?.addEventListener("input", (event) => {
    state.playerName = String(event.target.value || "");
    savePlayerName();
    renderPlayerNameEditor();
    if (isStoryMode()) {
      syncPromptFromPersona();
    }
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

  elements.randomCastButton?.addEventListener("click", () => {
    applyRandomCastSettings();
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

  elements.mockStoryOpenerInput?.addEventListener("input", (event) => {
    state.mockStoryOpener = event.target.value;
    saveMockStoryOpener();
    state.promptNotice = "モック開始文を保存しました。";
    renderMockStoryOpenerEditor();
  });

  elements.mockStoryOpenerBackgroundButton?.addEventListener("click", () => {
    setMockStoryOpener(
      generateMockStoryOpener({
        randomize: false,
        background: state.storyBackground,
        cast: state.storyCast,
      })
    );
    state.promptNotice = "背景に合わせてモック開始文を再生成しました。";
    renderMockStoryOpenerEditor();
  });

  elements.mockStoryOpenerRandomButton?.addEventListener("click", () => {
    setMockStoryOpener(
      generateMockStoryOpener({
        randomize: true,
        background: state.storyBackground,
        cast: state.storyCast,
      })
    );
    state.promptNotice = "モック開始文をランダム生成しました。";
    renderMockStoryOpenerEditor();
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

  if (isStoryMode() && isStoryOpenerPrompt(userText)) {
    return createMockStoryOpener();
  }

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
  renderPlayerNameEditor();
  renderStoryBackgroundEditor();
  renderMockStoryOpenerEditor();
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
  const missingPlayerName = isStoryMode() && !state.playerName.trim();
  elements.sendButton.disabled =
    state.isSending ||
    missingPlayerName ||
    !elements.messageInput.value.trim();
  elements.messageInput.disabled = state.isSending;
}

function renderPlayerNameEditor() {
  if (!elements.playerNameInput || !elements.playerNameNote) {
    return;
  }

  if (elements.playerNameInput.value !== state.playerName) {
    elements.playerNameInput.value = state.playerName;
  }

  const trimmedName = state.playerName.trim();
  elements.playerNameNote.textContent = trimmedName
    ? `物語では「${trimmedName}」で呼びます。`
    : "物語ではこの名前で呼びます。空欄のままではゲームマスターを開始できません。";
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

function renderMockStoryOpenerEditor() {
  if (!elements.mockStoryOpenerInput || !elements.mockStoryOpenerNote) {
    return;
  }

  if (elements.mockStoryOpenerInput.value !== state.mockStoryOpener) {
    elements.mockStoryOpenerInput.value = state.mockStoryOpener;
  }

  const openerLength = state.mockStoryOpener.trim().length;
  elements.mockStoryOpenerNote.textContent =
    state.promptNotice ||
    `空欄なら背景に合わせて自動生成します。文字数: ${openerLength}`;
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

  const visiblePresets = isStoryMode()
    ? PERSONA_PRESETS.filter((persona) => persona.id === "story")
    : PERSONA_PRESETS.filter((persona) => persona.id !== "story");

  for (const persona of visiblePresets) {
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

function loadMockStoryOpener() {
  try {
    const raw = localStorage.getItem(MOCK_STORY_OPENER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") {
        return parsed.trim();
      }
    }
  } catch {
    // fall through to generated default
  }

  return generateMockStoryOpener({
    randomize: false,
    background: DEFAULT_STORY_BACKGROUND,
    cast: DEFAULT_STORY_CAST,
  });
}

function loadPlayerName() {
  try {
    const raw = localStorage.getItem(PLAYER_NAME_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "string") {
        return parsed.trim();
      }
    }
  } catch {
    // fall through to empty
  }

  return "";
}

function loadPersona() {
  try {
    const raw = localStorage.getItem(PREFERENCE_KEY);
    if (!raw) {
      return { presetId: "story", customPrompt: "" };
    }

    JSON.parse(raw);
    return { presetId: "story", customPrompt: "" };
  } catch {
    return { presetId: "story", customPrompt: "" };
  }
}

function loadSystemPromptText(persona = loadPersona(), background = DEFAULT_STORY_BACKGROUND, cast = DEFAULT_STORY_CAST) {
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

  return buildPersonaPrompt(persona, cast, background);
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

function saveMockStoryOpener() {
  localStorage.setItem(MOCK_STORY_OPENER_KEY, JSON.stringify(state.mockStoryOpener));
}

function savePlayerName() {
  localStorage.setItem(PLAYER_NAME_KEY, JSON.stringify(state.playerName));
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
  return state.systemPromptText.trim() || buildPersonaPrompt(state.persona, state.storyCast, state.storyBackground);
}

function buildPersonaPrompt(
  persona = state.persona,
  cast = state.storyCast,
  background = state.storyBackground,
  playerName = state.playerName
) {
  const preset =
    PERSONA_PRESETS.find((item) => item.id === persona.presetId) || PERSONA_PRESETS[0];
  const custom = persona.customPrompt.trim();
  const castList = getActiveStoryCast(cast);
  const backgroundText = String(background || DEFAULT_STORY_BACKGROUND).trim() || DEFAULT_STORY_BACKGROUND;
  const playerNameText = String(playerName || "").trim();

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
      `物語背景: ${backgroundText}`,
      playerNameText ? `プレイヤー名: ${playerNameText}` : "プレイヤー名は未設定です。名前が入るまで、ユーザーを固有名で呼ばないでください。",
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
  const castList = getActiveStoryCast(state.storyCast);
  const background = String(state.storyBackground || DEFAULT_STORY_BACKGROUND).trim() || DEFAULT_STORY_BACKGROUND;
  const playerNameText = String(state.playerName || "").trim();

  return [
    "ゲームマスターとして物語を開始してください。",
    "最初の返答では、短い情景描写から始めて、今有効になっている登場人物を自然に登場させてください。",
    "2回目以降の返答でも、追加した登場人物のうち少なくとも2人を登場させてください。",
    "登場人物は固定メンバーとして扱い、名前・口調・役割をこの先も維持してください。",
    `固定キャラ: ${castList.map((character) => character.name).join(" / ")}`,
    `物語背景: ${background}`,
    playerNameText
      ? `プレイヤー名: ${playerNameText}`
      : "プレイヤー名は未設定です。名前が入るまで物語を開始しないでください。",
    "ユーザーの行動や感情は決めつけず、会話が自然に続く短い余韻で締めてください。",
    "返答は日本語で、2〜5文程度にしてください。",
  ].join("\n");
}

function getActiveStoryCast(cast = state.storyCast) {
  const activeCast = cast.filter((character) => character.active);
  return activeCast.length > 0 ? activeCast : cast.slice(0, 1);
}

function hasPlayerName() {
  return Boolean(state.playerName.trim());
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
    trimmed
      ? `${first?.name || "ミナ"}が小さくうなずく。「${trimmed}」`
      : `${first?.name || "ミナ"}が振り返り、淡い青色の扉を指さした。`,
    second
      ? `${second.name}は周囲を見回し、${third ? `${third.name}は扉の縁に残る光を静かに追っている。` : "足元の気配を静かに探っている。"}`
      : "静かな空気が、扉の向こうの気配を引き立てている。",
    "物語はここから、ゆっくり進み始める。",
  ].join("\n");
}

function createMockStoryOpener() {
  return (
    state.mockStoryOpener.trim() ||
    generateMockStoryOpener({
      randomize: false,
      background: state.storyBackground,
      cast: state.storyCast,
    })
  );
}

function isStoryOpenerPrompt(value) {
  return String(value || "").includes("ゲームマスターとして物語を開始してください。");
}

function setMockStoryOpener(value) {
  state.mockStoryOpener = String(value || "").trim();
  saveMockStoryOpener();
  renderMockStoryOpenerEditor();
}

function generateMockStoryOpener({ randomize = false, background = DEFAULT_STORY_BACKGROUND, cast = DEFAULT_STORY_CAST } = {}) {
  const backgroundText = String(background || DEFAULT_STORY_BACKGROUND).trim() || DEFAULT_STORY_BACKGROUND;
  const theme = detectBackgroundTheme(backgroundText);
  const activeCast = getActiveStoryCast(cast);
  const first = activeCast[0];
  const second = activeCast[1];
  const third = activeCast[2];
  const scene = pickStoryOpening(theme, backgroundText, randomize);
  const spotlight = pickCharacterSpotlight(theme, first, second, third, randomize);
  const closing = pickStoryClosing(theme, randomize);

  return [scene, spotlight, closing].join("\n");
}

function pickStoryOpening(theme, background, randomize) {
  const options = STORY_OPENING_LINES[theme] || STORY_OPENING_LINES.default;
  const chosen = randomize ? pickRandom(options) : options[0];
  return chosen.replace("{background}", formatBackgroundForOpening(background));
}

function pickCharacterSpotlight(theme, first, second, third, randomize) {
  const options = STORY_SPOTLIGHT_LINES[theme] || STORY_SPOTLIGHT_LINES.default;
  const chosen = randomize ? pickRandom(options) : options[0];
  return chosen
    .replace("{first}", first?.name || "ミナ")
    .replace("{second}", second?.name || "")
    .replace("{third}", third?.name || "");
}

function pickStoryClosing(theme, randomize) {
  const options = STORY_CLOSING_LINES[theme] || STORY_CLOSING_LINES.default;
  return randomize ? pickRandom(options) : options[0];
}

function detectBackgroundTheme(background) {
  const text = String(background || "");

  if (text.includes("駅") || text.includes("扉")) {
    return "station";
  }

  if (text.includes("港") || text.includes("潮") || text.includes("石畳")) {
    return "port";
  }

  if (text.includes("城") || text.includes("武家") || text.includes("路地")) {
    return "castle";
  }

  if (text.includes("未来") || text.includes("高架") || text.includes("端末") || text.includes("AI")) {
    return "future";
  }

  if (text.includes("魔法") || text.includes("学園") || text.includes("塔") || text.includes("庭園")) {
    return "academy";
  }

  if (text.includes("砂漠") || text.includes("交易") || text.includes("遺跡")) {
    return "desert";
  }

  return "default";
}

function formatBackgroundForOpening(background) {
  return String(background || "")
    .replace(/^舞台は[、,\s]*/u, "")
    .trim();
}

function pickRandom(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function generateRandomStoryCast() {
  const background = String(state.storyBackground || DEFAULT_STORY_BACKGROUND).trim() || DEFAULT_STORY_BACKGROUND;
  const theme = detectBackgroundTheme(background);
  const templates = STORY_CAST_VARIANTS[theme] || STORY_CAST_VARIANTS.default;
  const currentCast = state.storyCast || DEFAULT_STORY_CAST;

  return templates.map((slotTemplates, index) => {
    const template = pickRandom(slotTemplates);
    const current = currentCast[index] || {};
    return {
      id: `${theme}-${index}-${template.name}`,
      active: typeof current.active === "boolean" ? current.active : index === 0,
      name: template.name,
      role: template.role,
      personality: template.personality,
      speech: template.speech,
    };
  });
}

function applyRandomCastSettings() {
  state.storyCast = generateRandomStoryCast();
  saveStoryCast();
  applyStoryContextSettings("登場人物をランダム生成しました。");
  renderCastProfiles();
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
