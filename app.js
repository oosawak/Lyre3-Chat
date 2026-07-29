const STORAGE_KEY = "gemini-nano-chat-history-v1";
const PREFERENCE_KEY = "gemini-nano-chat-preferences-v1";
const PROMPT_KEY = "gemini-nano-chat-system-prompt-v1";
const CAST_KEY = "gemini-nano-chat-story-cast-v1";
const STORY_BACKGROUND_KEY = "gemini-nano-chat-story-background-v1";
const MOCK_STORY_OPENER_KEY = "gemini-nano-chat-mock-story-opener-v1";
const PLAYER_NAME_KEY = "gemini-nano-chat-player-name-v1";
const LOCALE_KEY = "gemini-nano-chat-locale-v1";
const DEFAULT_GREETING_TEXT = "こんにちは。ここで Gemini Nano に話しかけられます。";
const DEFAULT_LOCALE = "ja";
const DEFAULT_PLAYER_NAME_BY_LOCALE = {
  ja: "コウシロウ",
  en: "Koushirou",
  et: "Koushirou",
};
const CAST_ROLE_BY_LOCALE = {
  ja: {
    guide: "案内役",
    caution: "警戒役",
    observe: "観察役",
  },
  en: {
    guide: "Guide",
    caution: "Watchful",
    observe: "Observer",
  },
  et: {
    guide: "Teejuht",
    caution: "Ettevaatlik",
    observe: "Vaatleja",
  },
};
const LOCALE_ALIASES = {
  us: "en",
  en_us: "en",
  ee: "et",
  et: "et",
  ja: "ja",
  en: "en",
};
const MODEL_LANGUAGE_BY_LOCALE = {
  ja: "ja",
  en: "en",
  et: "en",
};
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
const STORY_PROGRESS_LINES = {
  station: [
    "ミナは扉の前から、駅の古い連絡通路へ目を向ける。そこなら、誰かの足跡が残っていそうだ。",
    "改札の向こうではなく、駅舎の裏手にある細い通路へ向かう。光の揺れが、手がかりをそこへ誘っていた。",
    "通路の突き当たりで、淡い青の光が一度だけ脈打つ。扉の秘密は、駅の中にまだ残っている。",
    "その先の階段を降りれば、ホームではない場所へつながりそうだ。",
  ],
  port: [
    "ミナは港の倉庫街へ視線を向ける。潮の匂いの中に、ひとつだけ新しい足跡が混じっている。",
    "波止場の奥にある古い倉庫が、少しだけ開いている。中から漏れる灯りが、次の手がかりを示していた。",
    "船着き場の先で、濡れたロープが不自然に揺れる。誰かが、ついさっきまでここにいた気配がする。",
    "港の奥へ進めば、噂の出どころにたどり着けそうだ。",
  ],
  castle: [
    "ミナは城下町の路地を選ぶ。表通りより、裏道のほうが噂の芯に近い。",
    "武家屋敷の塀の向こうで、ひとつだけ新しい下駄の音が消えた。誰かが先回りしているのかもしれない。",
    "古い蔵の戸口に、見慣れない紋が残っている。そこが、話の始まりらしかった。",
    "路地を抜けた先に、次の対面が待っていそうだ。",
  ],
  future: [
    "ミナは高架の下へ向かう。端末のノイズが薄くなり、代わりに生の気配が濃くなる。",
    "保守用の扉が少し開いている。そこから先は、一般の通路ではなさそうだ。",
    "壁面の表示が一瞬だけ乱れ、見慣れない番号を映す。誰かがこの都市の裏側を触っていた。",
    "高架の影を抜ければ、異変の中心に近づけそうだ。",
  ],
  academy: [
    "ミナは中庭ではなく、図書塔の裏階段へ目を向ける。静かな場所ほど、秘密が残りやすい。",
    "古い棚の奥に、授業で使わないはずの鍵束が置かれている。誰かが何かを隠したらしい。",
    "塔の窓辺で、風にめくれた紙がひらりと止まる。そこに書かれた記号が、次の扉を示していた。",
    "図書塔の上階へ進めば、物語の輪郭がはっきりしそうだ。",
  ],
  desert: [
    "ミナは街道ではなく、風除けの岩陰を選ぶ。旅慣れた者ほど、そこに痕跡を見る。",
    "砂に半分埋もれた標識が、古い遺跡の方角を示していた。誰かが急いで通った跡もある。",
    "荷車の車輪跡が、ひとつだけ不自然に途切れている。先に何かが待っている気配がした。",
    "砂丘を越えれば、失われた道筋の答えに届きそうだ。",
  ],
  default: [
    "ミナは、いちばん気になる方へ静かに歩き出す。小さな違和感が、次の場面を呼んでいた。",
    "何気ない場所のはずなのに、ひとつだけ手触りの違うものがある。そこから先に、まだ知らない景色が続いている。",
    "扉の向こうか、路地の先か。選ぶ場所が、少しずつ見えてきた。",
    "進むほどに、物語の輪郭がはっきりしていく。",
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
const CAST_RANDOMIZATION_LIBRARY = {
  ja: {
    themeTags: {
      station: "駅前",
      port: "港町",
      castle: "城下町",
      future: "高架の街",
      academy: "学園",
      desert: "砂の街道",
      default: "その場",
    },
    guide: {
      names: ["ミナ", "マヒル", "ナギ", "サク", "コト", "ハル"],
      personalities: [
        "明るく好奇心旺盛。{theme}で場面を前に進める",
        "軽やかで前向き。次のひと言で流れを作る",
        "親しみやすく積極的。空気をやわらかく動かす",
      ],
      speech: [
        "親しみやすく自然。最初に状況を開く",
        "明るく自然。話の入口をつくる",
        "やわらかく軽やか。前に進む一言が早い",
      ],
    },
    caution: {
      names: ["レイ", "ユウ", "カイ", "トワ", "ソラ", "リオ"],
      personalities: [
        "落ち着いていて慎重。{theme}の違和感を拾う",
        "小さな変化を見逃さない。危険の芽を先に読む",
        "観察好きで用心深い。気になる点をすぐ見つける",
      ],
      speech: [
        "簡潔で冷静。周囲の変化にすぐ気づく",
        "短く落ち着いた口調。危険や違和感を先に伝える",
        "短く、要点をはっきり伝える",
      ],
    },
    observe: {
      names: ["シオ", "カナ", "リク", "ヒナ", "ユイ", "ノエ"],
      personalities: [
        "静かで観察眼が鋭い。{theme}の細部をつなぐ",
        "穏やかで記録が得意。小さな手がかりを整理する",
        "静かに見て考える。場の気配をよく覚える",
      ],
      speech: [
        "やわらかいが端的。気配や手がかりをまとめる",
        "穏やかで端的。背景や気配を整理する",
        "やさしく端的。見たものを静かに伝える",
      ],
    },
  },
  en: {
    themeTags: {
      station: "the station",
      port: "the harbor",
      castle: "the castle town",
      future: "the overpass city",
      academy: "the academy",
      desert: "the desert road",
      default: "the scene",
    },
    guide: {
      names: ["Mira", "Nora", "Ava", "Lina", "Elin", "Sora"],
      personalities: [
        "Bright and curious. Keeps the scene moving at {theme}.",
        "Warm and quick on the uptake. Opens the next step without hesitating.",
        "Friendly and proactive. Helps the group move forward.",
      ],
      speech: [
        "Friendly and natural. Opens the conversation with an easy first line.",
        "Casual and smooth. Keeps the story moving forward.",
        "Warm, clear, and encouraging. Starts the next move quickly.",
      ],
    },
    caution: {
      names: ["Kai", "Rei", "Rowan", "Finn", "Noel", "Milo"],
      personalities: [
        "Calm and cautious. Notices small risks before they grow at {theme}.",
        "Steady and watchful. Spots inconsistencies fast.",
        "Thoughtful and careful. Keeps an eye on anything unusual.",
      ],
      speech: [
        "Short and composed. Points out danger and odd details first.",
        "Brief and steady. Says the important part without extra words.",
        "Clear and quiet. Warns about the risky parts early.",
      ],
    },
    observe: {
      names: ["Sio", "Iris", "Jude", "Nia", "Eden", "Rin"],
      personalities: [
        "Quiet and observant. Connects details with a steady eye at {theme}.",
        "Careful with clues and patterns. Notices what others miss.",
        "Soft-spoken and analytical. Pieces the scene together calmly.",
      ],
      speech: [
        "Gentle and concise. Organizes what was seen into clear notes.",
        "Soft, precise, and calm. Summarizes the atmosphere neatly.",
        "Quiet but exact. Turns small details into useful clues.",
      ],
    },
  },
  et: {
    themeTags: {
      station: "jaama",
      port: "sadama",
      castle: "lossilinna",
      future: "ülekäiguga linna",
      academy: "akadeemia",
      desert: "kõrbetee",
      default: "stseeni",
    },
    guide: {
      names: ["Mira", "Lina", "Ava", "Nora", "Elin", "Sora"],
      personalities: [
        "Elav ja uudishimulik. Viib loo {theme} juures edasi.",
        "Soe ja kiire taibuga. Avab järgmise sammu kõhklemata.",
        "Sõbralik ja aktiivne. Aitab seltskonnal edasi liikuda.",
      ],
      speech: [
        "Sõbralik ja loomulik. Avab vestluse kerge esimese reaga.",
        "Rahulik ja ladus. Viib loo edasi ilma takerdumata.",
        "Soe, selge ja julgustav. Alustab järgmise sammuga kiiresti.",
      ],
    },
    caution: {
      names: ["Kai", "Rei", "Rowan", "Finn", "Noel", "Milo"],
      personalities: [
        "Rahulik ja ettevaatlik. Märkab väikseid ohte enne, kui need kasvavad {theme} juures.",
        "Stabiilne ja tähelepanelik. Leiab vastuolud kiiresti.",
        "Mõtlik ja hoolikas. Hoidub kõigest kahtlasest.",
      ],
      speech: [
        "Lühike ja rahulik. Toob ohu ja veidrad detailid esimesena välja.",
        "Lühidalt ja kindlalt. Ütleb olulise ilma lisasõnadeta.",
        "Selge ja vaoshoitud. Hoiatab varakult riskide eest.",
      ],
    },
    observe: {
      names: ["Sio", "Iris", "Jude", "Nia", "Eden", "Rin"],
      personalities: [
        "Vaikne ja tähelepanelik. Seob detailid rahulikult kokku {theme} juures.",
        "Märkab mustreid ja vihjeid. Näeb seda, mida teised ei märka.",
        "Tasane ja analüütiline. Paneb stseeni rahulikult kokku.",
      ],
      speech: [
        "Õrn ja kokkuvõtlik. Korrastab nähtud asjad selgeteks märkmeteks.",
        "Pehme, täpne ja rahulik. Võtab õhustiku lühidalt kokku.",
        "Vaikne, kuid täpne. Muudab väikesed detailid kasulikeks vihjeteks.",
      ],
    },
  },
};
let appState = null;
const LOCALE_COPY = {
  ja: {
    documentTitle: "Lyre3 Story Chat",
    localeLabel: "言語",
    localeOptions: {
      ja: "日本語",
      en: "英語",
      et: "エストニア語",
    },
    modeTabsLabel: "会話モード",
    modeStory: "ゲームマスター",
    modeChat: "チャット",
    settingsSummaryKicker: "設定",
    settingsSummaryTitle: "状態 / Gem風 / Prompt",
    statusKicker: "状態",
    statusTitle: "モデル準備と接続状況",
    retryButton: "再チェック",
    downloadButton: "モデルを準備",
    stopButton: "停止",
    playerNameLabel: "キャラクター名",
    playerNameExample: "例: 主人公名",
    playerNameNote: "物語ではこの名前で呼びます。空欄のままではゲームマスターを開始できません。",
    personaTitle: "話し方や役割を切り替える",
    resetPersonaButton: "ゲームマスターに戻す",
    personaCustomLabel: "カスタム指示",
    personaCustomPlaceholder: "例: あなたは、短く要点を整理する作業アシスタントです。返答の最後に、次にやることを1行で添えてください。",
    castKicker: "固定キャラ",
    castTitle: "ゲームマスターが回す登場人物",
    applyCastButton: "設定を反映",
    applyCastMemoButton: "メモから上書き",
    randomCastButton: "ランダム生成",
    castMemoLabel: "登場人物メモ",
    castMemoPlaceholder: "例: 〖登場人物1〗\n名前：登場人物名\n性別：男性\n種族：種族名\n見た目：髪色や服装など\n一人称：私\n二人称：貴方\n備考：主人公の側近の1人。",
    castMemoNote: "区切りごと貼り付けると、登場人物の名前・役割・特徴・話し方・備考を上書きできます。",
    castNote: "まずは1人から始めて、追加した人数だけ会話に登場させられます。",
    backgroundKicker: "背景",
    backgroundTitle: "物語メモ",
    applyBackgroundButton: "設定を反映",
    backgroundLabel: "物語メモ",
    storySettingLabel: "物語の舞台",
    storyProtagonistLabel: "主人公について",
    storyWorldLabel: "魔王軍について",
    storyRulesLabel: "AI側が遵守すべき事柄",
    storySettingPlaceholder: "例: 夕暮れの駅前。武家屋敷と路地が入り組んだ城下町。",
    storyProtagonistPlaceholder: "例: 魔王コウシロウ。強大な戦闘力を持つ。",
    storyWorldPlaceholder: "例: アットホームで平等な組織。健康管理やインフラ整備が行き届いている。",
    storyRulesPlaceholder: "例: コウシロウは唯一の魔王。追放・差別・虐待の描写は禁止。",
    storyMemoNote: "舞台、主人公、世界観、ルールを別々に書けます。空欄の部分はそのままでも大丈夫です。",
    storyMemoNotePrefix: "物語メモの文字数:",
    openerKicker: "モック開始文",
    openerTitle: "初回の物語の入り口",
    openerBackgroundButton: "背景から再生成",
    openerRandomButton: "ランダム生成",
    openerLabel: "モック開始文",
    openerPlaceholder: "背景に合わせた、物語の始まりの文を編集できます。",
    openerNote: "空欄なら背景に合わせて自動生成します。",
    promptKicker: "Prompt",
    promptTitle: "AIに渡すプロンプト",
    syncPromptButton: "再生成",
    copyPromptButton: "プロンプトをコピー",
    promptLabel: "送信されるプロンプト本文",
    promptPlaceholder: "AIに渡すプロンプトを編集できます。",
    promptNote: "人格を切り替えると、この欄の内容も更新できます。",
    messagePlaceholder: "Lyre3に話しかける...",
    storyMessagePlaceholder: "物語を進める言葉を入れてください。",
    clearButton: "履歴を消去",
    sendButton: "送信",
    footnote: "非対応端末では、会話体験だけ確認できるモック応答に切り替わります。",
    emptyChat: "ここに会話履歴が表示されます。ゲームマスターを選ぶと、最初の場面がここから始まります。",
    apiLabel: "API",
    modelLabel: "モデル",
    modeLabel: "モード",
    modeNative: "Gemini Nano",
    modeMock: "モック",
    statusChecking: "ブラウザのAI機能を確認しています。",
    statusReady: "Gemini Nano が利用可能です。会話を始められます。",
    statusUnavailable: "この環境では Prompt API が見つからないため、モック応答に切り替えています。",
    statusModelUnsupported: "Gemini Nano はこの端末では利用できません。モック応答で動作します。",
    statusPrepareModel: "Gemini Nano のダウンロードを開始しています。",
    statusModelDownloading: "モデルをダウンロードしています。",
    statusModelReady: "モデル準備済み",
    statusModelAvailable: "ダウンロード可能",
    statusModelDownloadingLabel: "ダウンロード中",
    statusPreparing: "利用可否を確認しています。",
    statusInitModel: "Gemini Nano を初期化しています。",
    statusResponding: "Gemini Nano が返答を作成しています。",
    statusResponseReady: "応答が届きました。",
    statusStoryStart: "物語を始めました。続きを返してみてください。",
    statusMockThinking: "モック応答を作成しています。",
    statusMockDone: "モック応答を返しました。",
    statusRetrying: "処理を中断しています。",
    statusGameMasterLoading: "ゲームマスターを読み込み中です。新しい物語を始めます。",
    statusPersonaChanged: "人格を切り替えました。もう一度モデルを準備すると反映されます。",
    statusSavedPrompt: "編集内容を保存しました。",
    statusSavedCast: "登場人物を保存しました。変更を反映してください。",
    statusSavedBackground: "物語メモを保存しました。反映すると次の物語に使われます。",
    statusSavedOpener: "モック開始文を保存しました。",
    statusRegenOpenerByBackground: "背景に合わせてモック開始文を再生成しました。",
    statusRandomOpener: "モック開始文をランダム生成しました。",
    statusRandomCast: "登場人物をランダム生成しました。",
    statusPromptRegenerated: "人格からプロンプトを再生成しました。",
    statusPromptCopied: "プロンプトをコピーしました。",
    statusPromptCopyFailed: "コピーに失敗したので、欄から手動でコピーしてください。",
    statusNeedOneCast: "少なくとも 1 人は必要です。",
    progressDownloading: "ダウンロード中",
    progressPrepared: "モデル準備済み",
    progressDownloadable: "ダウンロード可能",
    progressNotReady: "ダウンロード準備中",
    castStatusActive: "登場中",
    castStatusInactive: "追加候補",
    castFieldName: "名前",
    castFieldRole: "役割",
    castFieldPersonality: "特徴",
    castFieldSpeech: "話し方",
    castFieldMemo: "備考",
    castAddButton: "追加",
    castRemoveButton: "外す",
    castNote: "最初はミナだけが登場中です。追加を押すとレイやシオを物語へ足せます。",
    storyBackgroundNotePrefix: "物語メモを保存できます。文字数:",
    mockOpenerNotePrefix: "空欄なら背景に合わせて自動生成します。文字数:",
    promptNotePrefix: "保存済みのプロンプトです。文字数:",
  },
  en: {
    documentTitle: "Lyre3 Story Chat",
    localeLabel: "Language",
    localeOptions: {
      ja: "Japanese",
      en: "English",
      et: "Estonian",
    },
    modeTabsLabel: "Conversation mode",
    modeStory: "Game Master",
    modeChat: "Chat",
    settingsSummaryKicker: "Settings",
    settingsSummaryTitle: "Status / Gem-style / Prompt",
    statusKicker: "Status",
    statusTitle: "Model and connection",
    retryButton: "Recheck",
    downloadButton: "Prepare model",
    stopButton: "Stop",
    playerNameLabel: "Character name",
    playerNameExample: "Example: hero name",
    playerNameNote: "We'll use this name in the story. The Game Master can't start while it is empty.",
    personaTitle: "Switch style and role",
    resetPersonaButton: "Back to Game Master",
    personaCustomLabel: "Custom instructions",
    personaCustomPlaceholder: "Example: You are a short, focused work assistant. End each reply with one line for the next step.",
    castKicker: "Cast",
    castTitle: "Characters handled by the Game Master",
    applyCastButton: "Apply settings",
    applyCastMemoButton: "Overwrite from memo",
    randomCastButton: "Randomize",
    castMemoLabel: "Character memo",
    castMemoPlaceholder: "Example: 〖Character 1〗\nName: Hugo\nGender: Male\nRace: Dark elf\nAppearance: Brown skin, white hair, slicked back\nFirst person: I\nSecond person: you\nNotes: One of the demon lord's close aides.",
    castMemoNote: "Paste a memo block to overwrite names, roles, traits, voice, and notes.",
    castNote: "Start with one character, then add as many as you want.",
    backgroundKicker: "Background",
    backgroundTitle: "Story memo",
    applyBackgroundButton: "Apply settings",
    backgroundLabel: "Story memo",
    storySettingLabel: "Story setting",
    storyProtagonistLabel: "Protagonist notes",
    storyWorldLabel: "Demon army notes",
    storyRulesLabel: "Rules the AI must follow",
    storySettingPlaceholder: "Example: A twilight station. A castle town with winding lanes and old samurai houses.",
    storyProtagonistPlaceholder: "Example: The demon king rules from the top of the demon world with overwhelming strength.",
    storyWorldPlaceholder: "Example: The demon army is friendly and fair, with careful health management and solid infrastructure.",
    storyRulesPlaceholder: "Example: The demon king is unique. No exile, discrimination, or abuse in the story.",
    storyMemoNote: "Write the setting, protagonist, world, and rules separately. Empty sections can stay blank.",
    storyMemoNotePrefix: "Story memo length:",
    openerKicker: "Mock opener",
    openerTitle: "Starting line for the first scene",
    openerBackgroundButton: "Regenerate from background",
    openerRandomButton: "Randomize",
    openerLabel: "Mock opener",
    openerPlaceholder: "You can edit the opening line for the story.",
    openerNote: "If left empty, it will be generated from the current background.",
    promptKicker: "Prompt",
    promptTitle: "Prompt sent to the AI",
    syncPromptButton: "Regenerate",
    copyPromptButton: "Copy prompt",
    promptLabel: "Prompt body",
    promptPlaceholder: "Edit the prompt sent to the AI.",
    promptNote: "Changing the persona updates this field too.",
    messagePlaceholder: "Talk to Lyre3...",
    storyMessagePlaceholder: "Enter the next move for the story.",
    clearButton: "Clear history",
    sendButton: "Send",
    footnote: "On unsupported devices, the app falls back to mock replies so you can still try the experience.",
    emptyChat: "Conversation history will appear here. Pick Game Master to begin the first scene here.",
    apiLabel: "API",
    modelLabel: "Model",
    modeLabel: "Mode",
    modeNative: "Gemini Nano",
    modeMock: "Mock",
    statusChecking: "Checking browser AI features.",
    statusReady: "Gemini Nano is available. You can start chatting.",
    statusUnavailable: "Prompt API isn't available in this environment, so mock replies are enabled.",
    statusModelUnsupported: "Gemini Nano isn't available on this device. Mock replies are enabled.",
    statusPrepareModel: "Starting the Gemini Nano download.",
    statusModelDownloading: "Downloading the model.",
    statusModelReady: "Model ready",
    statusModelAvailable: "Download available",
    statusModelDownloadingLabel: "Downloading",
    statusPreparing: "Checking availability.",
    statusInitModel: "Initializing Gemini Nano.",
    statusResponding: "Gemini Nano is composing a reply.",
    statusResponseReady: "Response received.",
    statusStoryStart: "The story has started. Please continue.",
    statusMockThinking: "Creating a mock reply.",
    statusMockDone: "Mock reply returned.",
    statusRetrying: "Stopping current work.",
    statusGameMasterLoading: "Loading the Game Master. Starting a new story.",
    statusPersonaChanged: "Persona changed. Prepare the model again for it to take effect.",
    statusSavedPrompt: "Saved the edits.",
    statusSavedCast: "Saved the characters. Apply changes to use them.",
    statusSavedBackground: "Saved the story memo. It will be used in the next story.",
    statusSavedOpener: "Saved the mock opener.",
    statusRegenOpenerByBackground: "Regenerated the mock opener from the current background.",
    statusRandomOpener: "Randomized the mock opener.",
    statusRandomCast: "Randomized the cast.",
    statusPromptRegenerated: "Regenerated the prompt from the persona.",
    statusPromptCopied: "Copied the prompt.",
    statusPromptCopyFailed: "Couldn't copy. Please copy it manually from the field.",
    statusNeedOneCast: "At least one character is required.",
    progressDownloading: "Downloading",
    progressPrepared: "Model ready",
    progressDownloadable: "Download available",
    progressNotReady: "Preparing download",
    castStatusActive: "Active",
    castStatusInactive: "Available",
    castFieldName: "Name",
    castFieldRole: "Role",
    castFieldPersonality: "Traits",
    castFieldSpeech: "Voice",
    castFieldMemo: "Notes",
    castAddButton: "Add",
    castRemoveButton: "Remove",
    castNote: "Start with Mina, then add more characters as needed.",
    storyBackgroundNotePrefix: "Story memo saved. Characters:",
    mockOpenerNotePrefix: "If left blank, it is generated from the background. Characters:",
    promptNotePrefix: "Saved prompt. Characters:",
  },
  et: {
    documentTitle: "Lyre3 Story Chat",
    localeLabel: "Keel",
    localeOptions: {
      ja: "Jaapani",
      en: "Inglise",
      et: "Eesti",
    },
    modeTabsLabel: "Vestlusrežiim",
    modeStory: "Mängujuhataja",
    modeChat: "Vestlus",
    settingsSummaryKicker: "Seaded",
    settingsSummaryTitle: "Olek / Gem-stiil / Prompt",
    statusKicker: "Olek",
    statusTitle: "Mudel ja ühendus",
    retryButton: "Kontrolli uuesti",
    downloadButton: "Valmista mudel",
    stopButton: "Peata",
    playerNameLabel: "Tegelase nimi",
    playerNameExample: "Näide: kangelase nimi",
    playerNameNote: "Kasutame seda nime loos. Mängu ei saa alustada, kui see on tühi.",
    personaTitle: "Vaheta stiili ja rolli",
    resetPersonaButton: "Tagasi mängujuhile",
    personaCustomLabel: "Kohandatud juhised",
    personaCustomPlaceholder: "Näide: Sa oled lühike ja keskendunud tööassistent. Lõpeta iga vastus ühe reaga järgmise sammu kohta.",
    castKicker: "Osatäitjad",
    castTitle: "Tegelased, mida mängujuht juhib",
    applyCastButton: "Rakenda seaded",
    applyCastMemoButton: "Kirjuta märkmete järgi üle",
    randomCastButton: "Juhuslik",
    castMemoLabel: "Tegelaste märkmed",
    castMemoPlaceholder: "Näide: 〖Tegelane 1〗\nNimi: Hugo\nSugu: Mees\nRass: Tumedapäkapikk\nVälimus: pruun nahk, valged juuksed, tahapoole kammitud\nEsimene isik: mina\nTeine isik: sina\nMärkused: Demonkuninga lähedane abiline.",
    castMemoNote: "Kleebi märkmete plokk, et nimed, rollid, omadused, hääl ja märkused üle kirjutada.",
    castNote: "Alusta ühe tegelasega ja lisa soovi korral veel.",
    backgroundKicker: "Taust",
    backgroundTitle: "Loo märkus",
    applyBackgroundButton: "Rakenda seaded",
    backgroundLabel: "Loo märkus",
    storySettingLabel: "Loo keskkond",
    storyProtagonistLabel: "Peategelase märkmed",
    storyWorldLabel: "Deemonarmee märkmed",
    storyRulesLabel: "AI peab järgima",
    storySettingPlaceholder: "Näide: Hämar jaam sinise uksega. Lossilinn kitsaste tänavatega ja vanade samuraimajadega.",
    storyProtagonistPlaceholder: "Näide: Põhitegelane on deemonimaailma tipus ja valitseb tohutu jõuga.",
    storyWorldPlaceholder: "Näide: Deemonarmee on sõbralik ja õiglane, hea tervisekontrolli ja korraliku taristuga.",
    storyRulesPlaceholder: "Näide: Põhitegelane on ainus deemonikuningas. Lugu ei tohi sisaldada pagendamist, diskrimineerimist ega väärkohtlemist.",
    storyMemoNote: "Kirjuta keskkond, peategelane, maailm ja reeglid eraldi. Tühjad väljad võivad jääda tühjaks.",
    storyMemoNotePrefix: "Loo märkme pikkus:",
    openerKicker: "Mocki algus",
    openerTitle: "Esimese stseeni algus",
    openerBackgroundButton: "Genereeri tausta järgi",
    openerRandomButton: "Juhuslik",
    openerLabel: "Mocki algus",
    openerPlaceholder: "Sellesse väljale saad loo algusrea ise kirjutada.",
    openerNote: "Kui väli on tühi, genereeritakse see praeguse tausta põhjal.",
    promptKicker: "Prompt",
    promptTitle: "AI-le saadetav prompt",
    syncPromptButton: "Genereeri uuesti",
    copyPromptButton: "Kopeeri prompt",
    promptLabel: "Prompti sisu",
    promptPlaceholder: "Muuda AI-le saadetavat prompti.",
    promptNote: "Isiksuse muutmisel uuendatakse ka see väli.",
    messagePlaceholder: "Räägi Lyre3-ga...",
    storyMessagePlaceholder: "Sisesta loo järgmine käik.",
    clearButton: "Kustuta ajalugu",
    sendButton: "Saada",
    footnote: "Toetamata seadmetes kasutame näidisvastuseid, et saaksid kogemust ikka proovida.",
    emptyChat: "Vestluse ajalugu kuvatakse siin. Vali mängujuhataja, et esimene stseen siit algaks.",
    apiLabel: "API",
    modelLabel: "Mudel",
    modeLabel: "Režiim",
    modeNative: "Gemini Nano",
    modeMock: "Mock",
    statusChecking: "Kontrollin brauseri AI võimalusi.",
    statusReady: "Gemini Nano on saadaval. Võid vestelda.",
    statusUnavailable: "Prompt API pole selles keskkonnas saadaval, seega kasutame näidisvastuseid.",
    statusModelUnsupported: "Gemini Nano pole selles seadmes saadaval. Kasutame näidisvastuseid.",
    statusPrepareModel: "Alustan Gemini Nano allalaadimist.",
    statusModelDownloading: "Laen mudelit alla.",
    statusModelReady: "Mudel valmis",
    statusModelAvailable: "Allalaadimine saadaval",
    statusModelDownloadingLabel: "Allalaadimine",
    statusPreparing: "Kontrollin saadavust.",
    statusInitModel: "Alustan Gemini Nano käivitamist.",
    statusResponding: "Gemini Nano koostab vastust.",
    statusResponseReady: "Vastus saabus.",
    statusStoryStart: "Lugu on alanud. Palun jätka.",
    statusMockThinking: "Koostan näidisvastust.",
    statusMockDone: "Näidisvastus tagastatud.",
    statusRetrying: "Peatan praeguse töö.",
    statusGameMasterLoading: "Laen mängujuhatajat. Alustan uut lugu.",
    statusPersonaChanged: "Isiksus muudeti. Rakendumiseks valmista mudel uuesti ette.",
    statusSavedPrompt: "Salvestasin muudatused.",
    statusSavedCast: "Salvestasin tegelased. Rakenda muudatused kasutamiseks.",
    statusSavedBackground: "Salvestasin loo märkme. Seda kasutatakse järgmises loos.",
    statusSavedOpener: "Salvestasin mocki alguse.",
    statusRegenOpenerByBackground: "Genereerisin mocki alguse tausta järgi uuesti.",
    statusRandomOpener: "Genereerisin mocki alguse juhuslikult.",
    statusRandomCast: "Genereerisin tegelased juhuslikult.",
    statusPromptRegenerated: "Genereerisin prompti isiksuse järgi uuesti.",
    statusPromptCopied: "Kopeerisin prompti.",
    statusPromptCopyFailed: "Kopeerimine ebaõnnestus. Kopeeri see käsitsi väljast.",
    statusNeedOneCast: "Vaja on vähemalt ühte tegelast.",
    progressDownloading: "Allalaadimine",
    progressPrepared: "Mudel valmis",
    progressDownloadable: "Allalaadimine saadaval",
    progressNotReady: "Allalaadimiseks valmistumine",
    castStatusActive: "Aktiivne",
    castStatusInactive: "Lisatav",
    castFieldName: "Nimi",
    castFieldRole: "Roll",
    castFieldPersonality: "Iseloom",
    castFieldSpeech: "Kõneviis",
    castFieldMemo: "Märkused",
    castAddButton: "Lisa",
    castRemoveButton: "Eemalda",
    castNote: "Alusta Minaga ja lisa vajadusel rohkem tegelasi.",
    storyBackgroundNotePrefix: "Loo märkus salvestatud. Tegelasi:",
    mockOpenerNotePrefix: "Kui tühi, luuakse see tausta põhjal. Tegelasi:",
    promptNotePrefix: "Salvestatud prompt. Tegelasi:",
  },
};
const DEFAULT_STORY_CAST = [
      {
        id: "mina",
        active: true,
        name: "ミナ",
        role: "案内役",
        personality: "明るく好奇心旺盛。場面を前に進める",
        speech: "親しみやすく自然。ユーザーに最初に声をかける",
        memo: "",
      },
      {
        id: "rei",
        active: false,
        name: "レイ",
        role: "警戒役",
        personality: "落ち着いていて慎重。違和感を拾う",
        speech: "簡潔で少し冷静。危険や気になる点を指摘する",
        memo: "",
      },
      {
        id: "shio",
        active: false,
        name: "シオ",
        role: "観察役",
        personality: "静かで観察眼が鋭い。細部をつなぐ",
        speech: "やわらかいが端的。手がかりや状況を整理する",
        memo: "",
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
    prompt: "You are the Game Master. Guide the story with a fixed cast and keep their roles and voices consistent.",
  },
  {
    id: "custom",
    label: "カスタム",
    description: "自分で編集する",
    prompt: "",
  },
];
function getCurrentLocale() {
  return appState?.locale || DEFAULT_LOCALE;
}

function getModelLanguageCode(locale = getCurrentLocale()) {
  return MODEL_LANGUAGE_BY_LOCALE[normalizeLocale(locale)] || "en";
}

function buildSessionOptions(locale = getCurrentLocale()) {
  const language = getModelLanguageCode(locale);

  return {
    expectedInputs: [
      {
        type: "text",
        languages: [language],
      },
    ],
    expectedOutputs: [
      {
        type: "text",
        languages: [language],
      },
    ],
  };
}

const elements = {
  appCard: document.getElementById("appCard"),
  apiStatusChip: document.getElementById("apiStatusChip"),
  modelStatusChip: document.getElementById("modelStatusChip"),
  modeStatusChip: document.getElementById("modeStatusChip"),
  headerApiStatusChip: document.getElementById("headerApiStatusChip"),
  headerModelStatusChip: document.getElementById("headerModelStatusChip"),
  headerModeStatusChip: document.getElementById("headerModeStatusChip"),
  localeSelect: document.getElementById("localeSelect"),
  statusStripKicker: document.getElementById("statusStripKicker"),
  playerNameLabel: document.getElementById("playerNameLabel"),
  castKicker: document.getElementById("castKicker"),
  castTitle: document.getElementById("castTitle"),
  castMemoLabel: document.getElementById("castMemoLabel"),
  castMemoInput: document.getElementById("castMemoInput"),
  castMemoNote: document.getElementById("castMemoNote"),
  backgroundKicker: document.getElementById("backgroundKicker"),
  backgroundTitle: document.getElementById("backgroundTitle"),
  storySettingLabel: document.getElementById("storySettingLabel"),
  storyProtagonistLabel: document.getElementById("storyProtagonistLabel"),
  storyWorldLabel: document.getElementById("storyWorldLabel"),
  storyRulesLabel: document.getElementById("storyRulesLabel"),
  openerKicker: document.getElementById("openerKicker"),
  openerTitle: document.getElementById("openerTitle"),
  promptKicker: document.getElementById("promptKicker"),
  promptTitle: document.getElementById("promptTitle"),
  storySettingInput: document.getElementById("storySettingInput"),
  storyProtagonistInput: document.getElementById("storyProtagonistInput"),
  storyWorldInput: document.getElementById("storyWorldInput"),
  storyRulesInput: document.getElementById("storyRulesInput"),
  openerNoteLabel: document.getElementById("openerNoteLabel"),
  promptNoteLabel: document.getElementById("promptNoteLabel"),
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
  applyCastMemoButton: document.getElementById("applyCastMemoButton"),
  randomCastButton: document.getElementById("randomCastButton"),
  storyBackgroundPresetList: document.getElementById("storyBackgroundPresetList"),
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
const initialLocale = loadLocale();
const initialStoryBackground = loadStoryBackground(initialLocale);
const initialMockStoryOpener = loadMockStoryOpener(initialLocale, initialStoryBackground);
const initialPlayerName = loadPlayerName(initialLocale);

const state = {
  messages: loadHistory(initialLocale),
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
  storyBeatIndex: 0,
  playerName: initialPlayerName,
  locale: initialLocale,
};
appState = state;

state.systemPromptText = loadSystemPromptText(
  state.persona,
  state.storyBackground,
  state.storyCast,
  state.playerName,
  initialLocale
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

  elements.localeSelect?.addEventListener("change", (event) => {
    setLocale(event.target.value);
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

  elements.applyCastMemoButton?.addEventListener("click", () => {
    applyCastMemoImport();
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

    updateStoryMemoField("setting", getBackgroundPresetValue(state.locale, preset.id), { preset: true });
  });

  elements.storySettingInput?.addEventListener("input", (event) => {
    updateStoryMemoField("setting", event.target.value);
  });

  elements.storyProtagonistInput?.addEventListener("input", (event) => {
    updateStoryMemoField("protagonist", event.target.value);
  });

  elements.storyWorldInput?.addEventListener("input", (event) => {
    updateStoryMemoField("world", event.target.value);
  });

  elements.storyRulesInput?.addEventListener("input", (event) => {
    updateStoryMemoField("rules", event.target.value);
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
        locale: state.locale,
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
        locale: state.locale,
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
    const availability = await api.availability(buildSessionOptions());
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
    ...buildSessionOptions(),
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
        ? await promptNative(text, assistantMessage)
        : await promptMock(text);

    assistantMessage.text = sanitizeStoryReply(reply);
    if (isStoryMode()) {
      state.storyBeatIndex += 1;
    }
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

async function promptNative(userText, assistantMessage = null) {
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
        updateStreamingAssistant(output, assistantMessage);
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
        ? await promptNative(opener, assistantMessage)
        : await promptMock(opener);
    assistantMessage.text = sanitizeStoryReply(reply);
    state.storyBeatIndex = 1;
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

function updateStreamingAssistant(text, assistantMessage = null) {
  const target =
    assistantMessage ||
    [...state.messages].reverse().find((message) => message.role === "assistant");
  if (target) {
    target.text = text;
    renderMessagesOnly();
    scrollChatToBottom();
  }
}

function render() {
  applyLocaleCopy();
  const copy = getLocaleCopy();
  setStatusChipTexts(
    `${copy.apiLabel}: ${translateApiStatus(state.apiStatus)}`,
    `${copy.modelLabel}: ${translateModelStatus(state.modelStatus)}`,
    `${copy.modeLabel}: ${state.mode === "native" ? copy.modeNative : copy.modeMock}`
  );
  elements.statusMessage.textContent = translateStatusMessage(state.statusMessage);
  elements.retryButton.disabled = state.isPreparing;
  elements.downloadButton.hidden = !(state.mode === "native" && !state.session && state.modelStatus !== "available");
  elements.downloadButton.disabled = state.isPreparing || state.isDownloading;
  elements.progressWrap.hidden = !state.isDownloading && state.modelStatus !== "downloadable" && state.modelStatus !== "downloading";
  elements.downloadProgress.value = state.downloadPercent;
  elements.progressLabel.textContent = state.isDownloading
    ? `${copy.progressDownloading}: ${Math.round(state.downloadPercent)}%`
    : state.modelStatus === "available"
      ? copy.progressPrepared
      : state.modelStatus === "downloadable"
        ? copy.progressDownloadable
        : state.modelStatus === "downloading"
          ? `${copy.progressDownloading}: ${Math.round(state.downloadPercent)}%`
          : copy.progressNotReady;
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
  applyLocaleCopy();
  const copy = getLocaleCopy();
  setStatusChipTexts(
    `${copy.apiLabel}: ${translateApiStatus(state.apiStatus)}`,
    `${copy.modelLabel}: ${translateModelStatus(state.modelStatus)}`,
    `${copy.modeLabel}: ${state.mode === "native" ? copy.modeNative : copy.modeMock}`
  );
  elements.statusMessage.textContent = translateStatusMessage(state.statusMessage);
  elements.downloadButton.hidden = !(state.mode === "native" && !state.session && state.modelStatus !== "available");
  elements.downloadButton.disabled = state.isPreparing || state.isDownloading;
  elements.progressWrap.hidden = !state.isDownloading && state.modelStatus !== "downloadable" && state.modelStatus !== "downloading";
  elements.downloadProgress.value = state.downloadPercent;
  elements.progressLabel.textContent = state.isDownloading
    ? `${copy.progressDownloading}: ${Math.round(state.downloadPercent)}%`
    : state.modelStatus === "available"
      ? copy.progressPrepared
      : state.modelStatus === "downloadable"
        ? copy.progressDownloadable
        : state.modelStatus === "downloading"
          ? `${copy.progressDownloading}: ${Math.round(state.downloadPercent)}%`
          : copy.progressNotReady;
  elements.stopButton.hidden = !state.isSending;
  elements.stopButton.disabled = !state.isSending;
  renderModeTabs();
}

function setStatusChipTexts(apiText, modelText, modeText) {
  const targets = [
    elements.apiStatusChip,
    elements.modelStatusChip,
    elements.modeStatusChip,
    elements.headerApiStatusChip,
    elements.headerModelStatusChip,
    elements.headerModeStatusChip,
  ];
  const texts = [apiText, modelText, modeText, apiText, modelText, modeText];

  targets.forEach((chip, index) => {
    if (chip) {
      chip.textContent = texts[index];
    }
  });
}

function getLocaleCopy(locale = getCurrentLocale()) {
  return LOCALE_COPY[normalizeLocale(locale)] || LOCALE_COPY.ja;
}

function getPersonaLabel(locale, presetId) {
  const language = normalizeLocale(locale);
  const labels = {
    ja: {
      default: "標準",
      coach: "作業コーチ",
      reviewer: "レビュー係",
      idea: "発想係",
      story: "ゲームマスター",
      custom: "カスタム",
    },
    en: {
      default: "Standard",
      coach: "Work coach",
      reviewer: "Reviewer",
      idea: "Idea maker",
      story: "Game Master",
      custom: "Custom",
    },
    et: {
      default: "Tavaline",
      coach: "Tööcoach",
      reviewer: "Ülevaataja",
      idea: "Idee generaator",
      story: "Mängujuhataja",
      custom: "Kohandatud",
    },
  };

  return labels[language]?.[presetId] || presetId;
}

function getPersonaDescription(locale, presetId) {
  const language = normalizeLocale(locale);
  const descriptions = {
    ja: {
      default: "やさしい会話相手",
      coach: "整理して次を示す",
      reviewer: "抜け漏れを見つける",
      idea: "広げてから絞る",
      story: "固定キャラで進める",
      custom: "自分で編集する",
    },
    en: {
      default: "Friendly chat partner",
      coach: "Summarize and guide",
      reviewer: "Find gaps and risks",
      idea: "Expand, then narrow",
      story: "Progress with fixed cast",
      custom: "Edit it yourself",
    },
    et: {
      default: "Sõbralik vestluskaaslane",
      coach: "Korrasta ja suuna edasi",
      reviewer: "Leia lüngad ja riskid",
      idea: "Laienda ja kitsenda",
      story: "Järjesta püsikoosseisuga",
      custom: "Muuda ise",
    },
  };

  return descriptions[language]?.[presetId] || "";
}

function getBackgroundPresetLabel(locale, presetId) {
  const language = normalizeLocale(locale);
  const labels = {
    ja: {
      twilight_station: "夕暮れの駅前",
      rain_port: "雨の港町",
      castle_town: "城下町",
      neon_overpass: "近未来の高架都市",
      magic_academy: "魔法学園",
      desert_trade: "砂漠の交易路",
    },
    en: {
      twilight_station: "Twilight station",
      rain_port: "Rainy harbor",
      castle_town: "Castle town",
      neon_overpass: "Neon overpass city",
      magic_academy: "Magic academy",
      desert_trade: "Desert trade route",
    },
    et: {
      twilight_station: "Hämar jaam",
      rain_port: "Vihmane sadamalinn",
      castle_town: "Lossilinn",
      neon_overpass: "Neoonsildade linn",
      magic_academy: "Maagiline akadeemia",
      desert_trade: "Kõrbe kaubatee",
    },
  };

  return labels[language]?.[presetId] || presetId;
}

function getBackgroundPresetValue(locale, presetId) {
  const language = normalizeLocale(locale);
  const values = {
    ja: {
      twilight_station: "舞台は、夕暮れの駅前。日常のすぐ隣に、まだ誰も気づいていない扉がひとつあります。",
      rain_port: "舞台は、潮の匂いが残る雨の港町。濡れた石畳の先で、噂と約束が交差します。",
      castle_town: "舞台は、武家屋敷と路地が入り組む城下町。噂話と人情が物語を動かします。",
      neon_overpass: "舞台は、光る高架と端末の灯りが行き交う近未来都市。少し先の便利さの裏で、小さな異変が起きています。",
      magic_academy: "舞台は、古い塔と庭園のある魔法学園。授業の合間に、不思議な出来事が起きやすい場所です。",
      desert_trade: "舞台は、砂漠を越える交易路。行商人の噂、旅の記録、忘れられた遺跡が手がかりになります。",
    },
    en: {
      twilight_station: "The story takes place at a twilight station. A blue door appears beside ordinary daily life, unnoticed by most people.",
      rain_port: "The story takes place in a rainy harbor town where the smell of salt still lingers. Rumors and promises cross paths beyond the wet stone streets.",
      castle_town: "The story takes place in a castle town of narrow lanes and samurai houses. Rumors and human warmth keep the story moving.",
      neon_overpass: "The story takes place in a future city of glowing overpasses and terminal lights. Behind the convenience of the near future, small anomalies begin to surface.",
      magic_academy: "The story takes place in a magic academy with an old tower and gardens. Strange events tend to happen between classes.",
      desert_trade: "The story takes place along a desert trade route. Merchant rumors, travel records, and forgotten ruins all become clues.",
    },
    et: {
      twilight_station: "Loo toimub hämaral jaamaplatsil. Sinine uks ilmub argise elu kõrvale ja enamik inimesi ei märka seda.",
      rain_port: "Loo toimub vihmases sadamalinnas, kus soolalõhn veel õhus püsib. Märgade kiviteede taga põimuvad kuulujutud ja lubadused.",
      castle_town: "Loo toimub lossilinnas, kus on kitsad tänavad ja samurai-kvartalid. Kuulujutud ja inimlik soojus liigutavad lugu edasi.",
      neon_overpass: "Loo toimub tuleviku linnas, kus säravad viaduktid ja terminalituled. Lähedase tuleviku mugavuse varjus hakkavad kerkima väikesed anomaaliad.",
      magic_academy: "Loo toimub maagilises akadeemias vana torni ja aedadega. Tundide vahel kipuvad juhtuma kummalised asjad.",
      desert_trade: "Loo toimub läbi kõrbe kulgeval kaubateel. Kaupmeeste kuulujutud, reisijäljed ja unustatud varemed saavad vihjeteks.",
    },
  };

  return values[language]?.[presetId] || values.ja[presetId] || DEFAULT_STORY_BACKGROUND;
}

function getLocalizedStoryBackground(locale, theme = "station") {
  const presetByTheme = {
    station: "twilight_station",
    port: "rain_port",
    castle: "castle_town",
    future: "neon_overpass",
    academy: "magic_academy",
    desert: "desert_trade",
    default: "twilight_station",
  };

  return getBackgroundPresetValue(locale, presetByTheme[theme] || presetByTheme.default);
}

function isBuiltInStoryBackground(value) {
  const text = String(value || "").trim();
  if (!text) {
    return false;
  }

  if (text === DEFAULT_STORY_BACKGROUND) {
    return true;
  }

  const locales = ["ja", "en", "et"];
  for (const locale of locales) {
    for (const preset of STORY_BACKGROUND_PRESETS) {
      if (text === getBackgroundPresetValue(locale, preset.id)) {
        return true;
      }
    }
  }

  return false;
}

function applyLocaleCopy() {
  const copy = getLocaleCopy();
  const language = normalizeLocale(state.locale);
  document.documentElement.lang = language;
  document.title = copy.documentTitle;
  if (elements.localeSelect) {
    elements.localeSelect.value = language;
    elements.localeSelect.setAttribute("aria-label", copy.localeLabel);
    for (const option of elements.localeSelect.options) {
      option.textContent = copy.localeOptions?.[option.value] || option.textContent;
    }
  }

  const localeLabel = document.querySelector("label[for='localeSelect']");
  if (localeLabel) {
    localeLabel.textContent = copy.localeLabel;
  }

  if (elements.modeTabs) {
    elements.modeTabs.setAttribute("aria-label", copy.modeTabsLabel);
  }

  const modeButtons = elements.modeTabs?.querySelectorAll("[data-app-mode]");
  if (modeButtons) {
    for (const button of modeButtons) {
      if (!(button instanceof HTMLElement)) continue;
      button.textContent = button.dataset.appMode === "story" ? copy.modeStory : copy.modeChat;
    }
  }

  const settingsSummary = document.querySelector(".fold-section > summary");
  if (settingsSummary) {
    const kicker = settingsSummary.querySelector(".fold-kicker");
    const title = settingsSummary.querySelector(".fold-title");
    if (kicker) kicker.textContent = copy.settingsSummaryKicker;
    if (title) title.textContent = copy.settingsSummaryTitle;
  }

  const statusKicker = document.querySelector(".status-strip-head .fold-kicker");
  const statusTitle = document.querySelector(".status-strip-head .fold-title");
  if (statusKicker) statusKicker.textContent = copy.statusKicker;
  if (statusTitle) statusTitle.textContent = copy.statusTitle;

  if (elements.statusStripKicker) elements.statusStripKicker.textContent = copy.statusKicker;
  if (elements.playerNameLabel) elements.playerNameLabel.textContent = copy.playerNameLabel;
  const personaTitle = document.querySelector(".persona-title");
  if (personaTitle) personaTitle.textContent = copy.personaTitle;
  if (elements.castKicker) elements.castKicker.textContent = copy.castKicker;
  if (elements.castTitle) elements.castTitle.textContent = copy.castTitle;
  if (elements.castMemoLabel) elements.castMemoLabel.textContent = copy.castMemoLabel;
  if (elements.backgroundKicker) elements.backgroundKicker.textContent = copy.backgroundKicker;
  if (elements.backgroundTitle) elements.backgroundTitle.textContent = copy.backgroundTitle;
  if (elements.storySettingLabel) elements.storySettingLabel.textContent = copy.storySettingLabel;
  if (elements.storyProtagonistLabel) elements.storyProtagonistLabel.textContent = copy.storyProtagonistLabel;
  if (elements.storyWorldLabel) elements.storyWorldLabel.textContent = copy.storyWorldLabel;
  if (elements.storyRulesLabel) elements.storyRulesLabel.textContent = copy.storyRulesLabel;
  if (elements.openerKicker) elements.openerKicker.textContent = copy.openerKicker;
  if (elements.openerTitle) elements.openerTitle.textContent = copy.openerTitle;
  if (elements.promptKicker) elements.promptKicker.textContent = copy.promptKicker;
  if (elements.promptTitle) elements.promptTitle.textContent = copy.promptTitle;

  const personaCustomLabels = document.querySelectorAll(".persona-custom > span");
  if (personaCustomLabels[0]) personaCustomLabels[0].textContent = copy.personaCustomLabel;
  if (elements.storySettingInput) elements.storySettingInput.placeholder = copy.storySettingPlaceholder;
  if (elements.storyProtagonistInput) elements.storyProtagonistInput.placeholder = copy.storyProtagonistPlaceholder;
  if (elements.storyWorldInput) elements.storyWorldInput.placeholder = copy.storyWorldPlaceholder;
  if (elements.storyRulesInput) elements.storyRulesInput.placeholder = copy.storyRulesPlaceholder;
  if (elements.openerNoteLabel) elements.openerNoteLabel.textContent = copy.openerLabel;
  if (elements.promptNoteLabel) elements.promptNoteLabel.textContent = copy.promptLabel;

  const buttons = {
    retryButton: copy.retryButton,
    downloadButton: copy.downloadButton,
    stopButton: copy.stopButton,
    resetPersonaButton: copy.resetPersonaButton,
    applyCastButton: copy.applyCastButton,
    applyCastMemoButton: copy.applyCastMemoButton,
    randomCastButton: copy.randomCastButton,
    applyBackgroundButton: copy.applyBackgroundButton,
    mockStoryOpenerBackgroundButton: copy.openerBackgroundButton,
    mockStoryOpenerRandomButton: copy.openerRandomButton,
    syncPromptButton: copy.syncPromptButton,
    copyPromptButton: copy.copyPromptButton,
    clearButton: copy.clearButton,
    sendButton: copy.sendButton,
  };
  for (const [id, label] of Object.entries(buttons)) {
    const el = elements[id];
    if (el) {
      el.textContent = label;
    }
  }

  if (elements.playerNameInput) {
    elements.playerNameInput.placeholder = copy.playerNameExample;
  }
  if (elements.personaCustomInput) {
    elements.personaCustomInput.placeholder = copy.personaCustomPlaceholder;
  }
  if (elements.mockStoryOpenerInput) {
    elements.mockStoryOpenerInput.placeholder = copy.openerPlaceholder;
  }
  if (elements.systemPromptInput) {
    elements.systemPromptInput.placeholder = copy.promptPlaceholder;
  }
  if (elements.messageInput) {
    elements.messageInput.placeholder = buildComposerPlaceholder();
  }
  if (elements.playerNameNote) {
    elements.playerNameNote.textContent = copy.playerNameNote;
  }
  if (elements.castMemoInput) {
    elements.castMemoInput.placeholder = copy.castMemoPlaceholder;
  }
  if (elements.castMemoNote) {
    elements.castMemoNote.textContent = copy.castMemoNote;
  }
  if (elements.castNote) {
    elements.castNote.textContent = copy.castNote;
  }
  if (elements.storyBackgroundNote) {
    elements.storyBackgroundNote.textContent = copy.storyMemoNote;
  }
  if (elements.mockStoryOpenerNote) {
    elements.mockStoryOpenerNote.textContent = copy.openerNote;
  }
  if (elements.promptNote) {
    elements.promptNote.textContent = copy.promptNote;
  }
  const footnote = document.querySelector(".footnote");
  if (footnote) {
    footnote.textContent = copy.footnote;
  }
}

function translateApiStatus(value) {
  const copy = getLocaleCopy();
  if (normalizeLocale(state.locale) === "ja") {
    return value;
  }
  const map = {
    確認中: "checking",
    非対応: "unsupported",
    検出済み: "detected",
    エラー: "error",
  };
  return map[value] || value;
}

function translateModelStatus(value) {
  const copy = getLocaleCopy();
  const language = normalizeLocale(state.locale);
  if (language === "ja") {
    return value;
  }
  const map = {
    未確認: "unknown",
    モック: "mock",
    available: copy.statusModelReady,
    downloadable: copy.statusModelAvailable,
    downloading: copy.statusModelDownloadingLabel,
    失敗: "failed",
  };
  return map[value] || value;
}

function translateStatusMessage(message) {
  const language = normalizeLocale(state.locale);
  if (language === "ja") {
    return message;
  }
  const map = {
    "ブラウザのAI機能を確認しています。": getLocaleCopy().statusChecking,
    "利用可否を確認しています。": getLocaleCopy().statusPreparing,
    "この環境では Prompt API が見つからないため、モック応答に切り替えています。": getLocaleCopy().statusUnavailable,
    "Gemini Nano はこの端末では利用できません。モック応答で動作します。": getLocaleCopy().statusModelUnsupported,
    "Gemini Nano のダウンロードを開始しています。": getLocaleCopy().statusPrepareModel,
    "モデルをダウンロードしています。": getLocaleCopy().statusModelDownloading,
    "Prompt API が見つかりません。モック応答をご利用ください。": getLocaleCopy().statusUnavailable,
    "Gemini Nano を初期化しています。": getLocaleCopy().statusInitModel,
    "Gemini Nano が利用可能です。会話を始められます。": getLocaleCopy().statusReady,
    "Gemini Nano が返答を作成しています。": getLocaleCopy().statusResponding,
    "応答が届きました。": getLocaleCopy().statusResponseReady,
    "物語を始めました。続きを返してみてください。": getLocaleCopy().statusStoryStart,
    "モック応答を作成しています。": getLocaleCopy().statusMockThinking,
    "モック応答を返しました。": getLocaleCopy().statusMockDone,
    "処理を中断しています。": getLocaleCopy().statusRetrying,
    "ゲームマスターを読み込み中です。新しい物語を始めます。": getLocaleCopy().statusGameMasterLoading,
    "人格を切り替えました。もう一度モデルを準備すると反映されます。": getLocaleCopy().statusPersonaChanged,
    "編集内容を保存しました。": getLocaleCopy().statusSavedPrompt,
    "登場人物を保存しました。変更を反映してください。": getLocaleCopy().statusSavedCast,
    "物語メモを保存しました。": getLocaleCopy().statusSavedBackground,
    "物語メモを保存しました。反映すると次の物語に使われます。": getLocaleCopy().statusSavedBackground,
    "モック開始文を保存しました。": getLocaleCopy().statusSavedOpener,
    "背景に合わせてモック開始文を再生成しました。": getLocaleCopy().statusRegenOpenerByBackground,
    "モック開始文をランダム生成しました。": getLocaleCopy().statusRandomOpener,
    "登場人物をランダム生成しました。": getLocaleCopy().statusRandomCast,
    "人格からプロンプトを再生成しました。": getLocaleCopy().statusPromptRegenerated,
    "プロンプトをコピーしました。": getLocaleCopy().statusPromptCopied,
    "コピーに失敗したので、欄から手動でコピーしてください。": getLocaleCopy().statusPromptCopyFailed,
    "少なくとも 1 人は必要です。": getLocaleCopy().statusNeedOneCast,
  };
  return map[message] || message;
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
    const isChatButton = button.dataset.appMode === "chat";
    button.disabled = isChatButton;
    button.setAttribute("aria-disabled", isChatButton ? "true" : "false");
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
  elements.messageInput.placeholder = buildComposerPlaceholder();
}

function buildComposerPlaceholder() {
  const copy = getLocaleCopy();
  if (!isStoryMode()) {
    return copy.messagePlaceholder;
  }

  const theme = detectBackgroundTheme(state.storyBackground);
  const castName = getActiveStoryCast()[0]?.name || "ミナ";
  const hints = {
    ja: {
      station: [
        "例: 扉に触れる / 裏通路へ向かう / 周囲を調べる",
        "例: 連絡通路を見に行く / ミナに光のことを伝える",
      ],
      port: [
        "例: 倉庫街を探す / 港の方へ進む / 足跡を追う",
        "例: 船着き場を見回す / ミナに手がかりを聞く",
      ],
      castle: [
        "例: 路地を進む / 蔵の前を調べる / 噂をたずねる",
        "例: 裏道へ向かう / ミナに紋のことを伝える",
      ],
      future: [
        "例: 保守通路を調べる / 高架の下へ向かう / ノイズを追う",
        "例: 端末の表示を見る / ミナに異常を伝える",
      ],
      academy: [
        "例: 図書塔へ向かう / 鍵束を調べる / 紙片を追う",
        "例: 回廊を見に行く / ミナに記号のことを伝える",
      ],
      desert: [
        "例: 砂丘の先へ向かう / 標識を調べる / 足跡を追う",
        "例: 岩陰を見に行く / ミナに遺跡のことを伝える",
      ],
      default: [
        "例: 扉を調べる / 周囲を見回す / ミナに相談する",
        "例: 次の場所へ進む / 気になるものを確認する",
      ],
    },
    en: {
      station: [
        "Example: touch the door / head for the back corridor / check the area",
        "Example: inspect the passage / tell Mina about the light",
      ],
      port: [
        "Example: search the warehouse district / move toward the harbor / follow the tracks",
        "Example: look over the pier / ask Mina for a clue",
      ],
      castle: [
        "Example: take the alley / inspect the front of the storehouse / ask about the rumor",
        "Example: head down the back street / tell Mina about the crest",
      ],
      future: [
        "Example: check the maintenance path / head under the overpass / follow the noise",
        "Example: look at the terminal display / tell Mina about the anomaly",
      ],
      academy: [
        "Example: go to the tower / inspect the key ring / follow the paper slip",
        "Example: check the corridor / tell Mina about the symbols",
      ],
      desert: [
        "Example: head beyond the dune / inspect the marker / follow the tracks",
        "Example: look under the rocks / tell Mina about the ruins",
      ],
      default: [
        "Example: inspect the door / look around / ask Mina",
        "Example: move to the next place / check the strange detail",
      ],
    },
    et: {
      station: [
        "Näide: puuduta ust / liigu tagakäiku / kontrolli ümbrust",
        "Näide: vaata käiku / räägi Minale valgusest",
      ],
      port: [
        "Näide: otsi laohoonete piirkonda / liigu sadama poole / jälgi jälgi",
        "Näide: vaata kail ringi / küsi Minalt vihjet",
      ],
      castle: [
        "Näide: mine kõrvaltänavasse / uuri laohoone ees / küsi kuulujutu kohta",
        "Näide: liigu tagatänaval / räägi Minale vapist",
      ],
      future: [
        "Näide: kontrolli hoolduskoridori / mine silla alla / jälgi müra",
        "Näide: vaata terminali ekraani / ütle Minale anomaaliast",
      ],
      academy: [
        "Näide: mine torni juurde / uuri võtmerõngast / järgi paberitükki",
        "Näide: kontrolli koridori / räägi Minale märkidest",
      ],
      desert: [
        "Näide: liigu üle luite / uuri tähist / jälgi jälgi",
        "Näide: vaata kivide alla / räägi Minale varemetest",
      ],
      default: [
        "Näide: uuri ust / vaata ringi / küsi Minalt",
        "Näide: liigu järgmisse kohta / kontrolli imelikku detaili",
      ],
    },
  };

  const options = hints[normalizeLocale(state.locale)][theme] || hints[normalizeLocale(state.locale)].default;
  return options[state.storyBeatIndex % options.length].replaceAll("ミナ", castName).replaceAll("Mina", castName);
}

function renderPlayerNameEditor() {
  if (!elements.playerNameInput || !elements.playerNameNote) {
    return;
  }

  if (elements.playerNameInput.value !== state.playerName) {
    elements.playerNameInput.value = state.playerName;
  }

  const trimmedName = state.playerName.trim();
  const copy = getLocaleCopy();
  elements.playerNameNote.textContent = trimmedName
    ? (normalizeLocale(state.locale) === "ja"
        ? `物語では「${trimmedName}」で呼びます。`
        : normalizeLocale(state.locale) === "et"
          ? `Loo sees kutsume sind nimega "${trimmedName}".`
          : `We'll call you "${trimmedName}" in the story.`)
    : copy.playerNameNote;
}

function renderPromptEditor() {
  if (!elements.systemPromptInput || !elements.promptNote) {
    return;
  }

  if (elements.systemPromptInput.value !== state.systemPromptText) {
    elements.systemPromptInput.value = state.systemPromptText;
  }

  const promptLength = state.systemPromptText.trim().length;
  const copy = getLocaleCopy();
  elements.promptNote.textContent =
    state.promptNotice ? translateStatusMessage(state.promptNotice) : `${copy.promptNotePrefix} ${promptLength}`;
}

function renderCastProfiles() {
  if (!elements.castList || !elements.castNote) {
    return;
  }

  elements.castList.replaceChildren();

  state.storyCast.forEach((character, index) => {
    const localizedRole = getLocalizedCastRole(character.role, state.locale);
    const card = document.createElement("article");
    card.className = "cast-card";
    card.innerHTML = `
      <div class="cast-card-head">
        <div>
          <p class="cast-name">${escapeHtml(character.name)}</p>
          <p class="cast-role">${escapeHtml(localizedRole)}</p>
        </div>
        <span class="cast-status ${character.active ? "active" : "inactive"}">
          ${character.active ? getLocaleCopy().castStatusActive : getLocaleCopy().castStatusInactive}
        </span>
      </div>
      <label class="cast-field">
        <span>${getLocaleCopy().castFieldName}</span>
        <input type="text" data-cast-field="name" data-cast-index="${index}" value="${escapeHtml(character.name)}" />
      </label>
      <label class="cast-field">
        <span>${getLocaleCopy().castFieldRole}</span>
        <input type="text" data-cast-field="role" data-cast-index="${index}" value="${escapeHtml(localizedRole)}" />
      </label>
      <label class="cast-field">
        <span>${getLocaleCopy().castFieldPersonality}</span>
        <textarea rows="2" data-cast-field="personality" data-cast-index="${index}">${escapeHtml(character.personality)}</textarea>
      </label>
      <label class="cast-field">
        <span>${getLocaleCopy().castFieldSpeech}</span>
        <textarea rows="2" data-cast-field="speech" data-cast-index="${index}">${escapeHtml(character.speech)}</textarea>
      </label>
      <label class="cast-field">
        <span>${getLocaleCopy().castFieldMemo}</span>
        <textarea rows="3" data-cast-field="memo" data-cast-index="${index}">${escapeHtml(character.memo || "")}</textarea>
      </label>
      <button class="ghost-button cast-copy" type="button" data-toggle-cast="${index}">
        ${character.active ? getLocaleCopy().castRemoveButton : getLocaleCopy().castAddButton}
      </button>
    `;
    elements.castList.append(card);
  });

  elements.castNote.textContent = getLocaleCopy().castNote;
}

function renderStoryBackgroundEditor() {
  if (
    !elements.storySettingInput ||
    !elements.storyProtagonistInput ||
    !elements.storyWorldInput ||
    !elements.storyRulesInput ||
    !elements.storyBackgroundNote ||
    !elements.storyBackgroundPresetList
  ) {
    return;
  }

  const fields = getStoryMemoFieldValues(state.storyBackground);
  if (elements.storySettingInput.value !== fields.setting) {
    elements.storySettingInput.value = fields.setting;
  }
  if (elements.storyProtagonistInput.value !== fields.protagonist) {
    elements.storyProtagonistInput.value = fields.protagonist;
  }
  if (elements.storyWorldInput.value !== fields.world) {
    elements.storyWorldInput.value = fields.world;
  }
  if (elements.storyRulesInput.value !== fields.rules) {
    elements.storyRulesInput.value = fields.rules;
  }

  elements.storyBackgroundPresetList.replaceChildren();

  for (const preset of STORY_BACKGROUND_PRESETS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "persona-pill";
    button.dataset.backgroundPreset = preset.id;
    button.textContent = getBackgroundPresetLabel(state.locale, preset.id);
    elements.storyBackgroundPresetList.append(button);
  }

  const backgroundLength = state.storyBackground.trim().length;
  const copy = getLocaleCopy();
  elements.storyBackgroundNote.textContent =
    state.promptNotice ? translateStatusMessage(state.promptNotice) : `${copy.storyMemoNotePrefix} ${backgroundLength}`;
}

function renderMockStoryOpenerEditor() {
  if (!elements.mockStoryOpenerInput || !elements.mockStoryOpenerNote) {
    return;
  }

  if (elements.mockStoryOpenerInput.value !== state.mockStoryOpener) {
    elements.mockStoryOpenerInput.value = state.mockStoryOpener;
  }

  const openerLength = state.mockStoryOpener.trim().length;
  const copy = getLocaleCopy();
  elements.mockStoryOpenerNote.textContent =
    state.promptNotice ? translateStatusMessage(state.promptNotice) : `${copy.mockOpenerNotePrefix} ${openerLength}`;
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
    button.textContent = `${getPersonaLabel(state.locale, persona.id)} · ${getPersonaDescription(state.locale, persona.id)}`;
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
        ${getLocaleCopy().emptyChat}
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

function loadHistory(locale = DEFAULT_LOCALE) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [createMessage("assistant", getGreetingText(locale))];
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
    return [createMessage("assistant", getGreetingText(locale))];
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

function loadStoryBackground(locale = DEFAULT_LOCALE) {
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

  return getLocalizedStoryBackground(locale, "station");
}

function loadMockStoryOpener(locale = DEFAULT_LOCALE, background = DEFAULT_STORY_BACKGROUND) {
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
    background,
    cast: DEFAULT_STORY_CAST,
    locale,
  });
}

function loadPlayerName(locale = DEFAULT_LOCALE) {
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

  return getDefaultPlayerName(locale);
}

function getDefaultPlayerName(locale = DEFAULT_LOCALE) {
  return DEFAULT_PLAYER_NAME_BY_LOCALE[normalizeLocale(locale)] || DEFAULT_PLAYER_NAME_BY_LOCALE.ja;
}

function getLocalizedCastRole(role, locale = getCurrentLocale()) {
  const text = String(role || "").trim();
  if (!text) {
    return text;
  }

  const canonicalRole = Object.keys(CAST_ROLE_BY_LOCALE.ja).find((key) => {
    return (
      CAST_ROLE_BY_LOCALE.ja[key] === text ||
      CAST_ROLE_BY_LOCALE.en[key] === text ||
      CAST_ROLE_BY_LOCALE.et[key] === text
    );
  });

  if (!canonicalRole) {
    return text;
  }

  const language = normalizeLocale(locale);
  return CAST_ROLE_BY_LOCALE[language]?.[canonicalRole] || text;
}

function getCastRandomizationProfile(locale = getCurrentLocale()) {
  return CAST_RANDOMIZATION_LIBRARY[normalizeLocale(locale)] || null;
}

function pickCastText(entries, themeTag) {
  const selected = pickRandom(entries);
  return String(selected || "").replaceAll("{theme}", themeTag);
}

function stripMarkdownMarkers(text) {
  return String(text || "")
    .trim()
    .replace(/^[*_\s]+/g, "")
    .replace(/[*_\s]+$/g, "")
    .trim();
}

function parseCastMemoSections(memoText) {
  const lines = String(memoText || "")
    .replace(/\r\n/g, "\n")
    .split("\n");
  const sections = [];
  let current = null;

  const flushCurrent = () => {
    if (!current) {
      return;
    }

    const fields = current.fields;
    const body = current.body.join("\n").trim();
    if (Object.keys(fields).length > 0 || body) {
      sections.push({
        title: current.title,
        fields,
        body,
      });
    }

    current = null;
  };

  for (const line of lines) {
    const trimmed = stripMarkdownMarkers(line);
    const headingMatch = trimmed.match(/^[【〖〔\[]\s*登場人物\s*([0-9０-９一二三四五六七八九十]+)?\s*[】〗〕\]]?$/u);

    if (headingMatch) {
      flushCurrent();
      current = {
        title: `登場人物${headingMatch[1] || ""}`.trim(),
        fields: {},
        body: [],
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const fieldMatch = trimmed.match(/^(.+?)[：:]\s*(.*)$/u);
    if (fieldMatch) {
      const label = fieldMatch[1].trim();
      const value = fieldMatch[2]
        .trim()
        .replace(/^[*_`]+/g, "")
        .replace(/[*_`]+$/g, "")
        .trim();
      if (value) {
        current.fields[label] = value;
      }
      continue;
    }

    if (trimmed) {
      current.body.push(trimmed);
    }
  }

  flushCurrent();

  return sections;
}

function buildCastMemoCharacter(section, index, locale = getCurrentLocale()) {
  const fields = section.fields || {};
  const language = normalizeLocale(locale);
  const name =
    fields["名前"] ||
    fields["Name"] ||
    fields["キャラクター名"] ||
    `キャラ${index + 1}`;
  const role =
    fields["役割"] ||
    fields["Role"] ||
    fields["立場"] ||
    fields["所属"] ||
    "";
  const personalityParts = [];
  const speechParts = [];
  const memoParts = [];

  const addMemo = (label, value) => {
    if (value) {
      memoParts.push(`${label}: ${value}`);
    }
  };

  const appearance = fields["見た目"] || fields["外見"] || fields["Appearance"] || "";
  const species = fields["種族"] || fields["Race"] || fields["Species"] || "";
  const gender = fields["性別"] || fields["Gender"] || "";
  const firstPerson = fields["一人称"] || fields["First person"] || fields["Pronoun"] || "";
  const secondPerson = fields["二人称"] || fields["Second person"] || "";
  const voice = fields["口調"] || fields["話し方"] || fields["Voice"] || "";
  const likes = fields["好きな物"] || fields["Likes"] || "";
  const dislikes = fields["嫌いな物"] || fields["Dislikes"] || "";
  const notes = fields["備考"] || fields["メモ"] || fields["Notes"] || "";
  const personality = fields["性格"] || fields["特徴"] || fields["Personality"] || fields["Traits"] || "";

  if (personality) {
    personalityParts.push(personality);
  }
  addMemo(language === "en" ? "Gender" : language === "et" ? "Sugu" : "性別", gender);
  addMemo(language === "en" ? "Race" : language === "et" ? "Rass" : "種族", species);
  addMemo(language === "en" ? "Appearance" : language === "et" ? "Välimus" : "見た目", appearance);
  addMemo(language === "en" ? "First person" : language === "et" ? "Esimene isik" : "一人称", firstPerson);
  addMemo(language === "en" ? "Second person" : language === "et" ? "Teine isik" : "二人称", secondPerson);
  addMemo(language === "en" ? "Likes" : language === "et" ? "Meeldib" : "好きな物", likes);
  addMemo(language === "en" ? "Dislikes" : language === "et" ? "Ei meeldi" : "嫌いな物", dislikes);
  if (notes) {
    memoParts.push(notes);
  }

  const fallbackMemo = section.body.trim();
  if (fallbackMemo) {
    memoParts.push(fallbackMemo);
  }

  const memoSummary = memoParts.filter(Boolean).join(" / ");
  if (personalityParts.length === 0 && memoSummary) {
    personalityParts.push(memoSummary);
  }

  return {
    id: `cast-${index + 1}`,
    active: true,
    name: String(name).trim(),
    role: String(role).trim() || (language === "en" ? "Character" : language === "et" ? "Tegelane" : "登場人物"),
    personality: String(personalityParts.join(" / ") || ""),
    speech: String(voice || ""),
    memo: memoParts.filter(Boolean).join("\n").trim(),
  };
}

function parseBackgroundMemoSections(backgroundText) {
  const lines = String(backgroundText || "")
    .replace(/\r\n/g, "\n")
    .split("\n");
  const sections = [];
  const intro = [];
  let current = null;

  const flushCurrent = () => {
    if (!current) {
      return;
    }

    const body = current.lines.join("\n").trim();
    if (body) {
      sections.push({
        title: current.title,
        body,
      });
    }

    current = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const headingMatch = trimmed.match(/^[【〖〔\[]\s*(.+?)\s*[】〗〕\]]$/u);

    if (headingMatch) {
      flushCurrent();
      current = {
        title: headingMatch[1].trim(),
        lines: [],
      };
      continue;
    }

    if (current) {
      current.lines.push(line);
    } else if (trimmed) {
      intro.push(line);
    }
  }

  flushCurrent();

  return {
    intro: intro.join("\n").trim(),
    sections,
  };
}

function getStoryBackgroundCoreText(backgroundText) {
  const parsed = parseBackgroundMemoSections(backgroundText);
  const settingSection = parsed.sections.find((section) => {
    const title = String(section.title || "").replace(/\s+/g, "");
    return (
      title.includes("物語背景") ||
      title.includes("背景") ||
      title.includes("舞台") ||
      title.includes("世界観") ||
      title.toLowerCase().includes("background") ||
      title.toLowerCase().includes("setting")
    );
  });

  if (settingSection?.body?.trim()) {
    return String(settingSection.body).trim();
  }

  if (parsed.sections.length === 0) {
    const intro = String(parsed.intro || "").trim();
    if (intro) {
      return intro;
    }
  }

  return DEFAULT_STORY_BACKGROUND;
}

function getStoryMemoFieldLabelMap(locale = getCurrentLocale()) {
  const language = normalizeLocale(locale);
  if (language === "en") {
    return {
      setting: "Story setting",
      protagonist: "Protagonist notes",
      world: "Demon army notes",
      rules: "Rules the AI must follow",
    };
  }

  if (language === "et") {
    return {
      setting: "Loo keskkond",
      protagonist: "Peategelase märkmed",
      world: "Deemonarmee märkmed",
      rules: "AI peab järgima",
    };
  }

  return {
    setting: "物語の舞台",
    protagonist: "主人公について",
    world: "魔王軍について",
    rules: "AI側が遵守すべき事柄",
  };
}

function getStoryMemoFieldValues(backgroundText) {
  const parsed = parseBackgroundMemoSections(backgroundText);
  const fields = {
    setting: "",
    protagonist: "",
    world: "",
    rules: "",
  };

  const appendField = (key, value) => {
    const text = String(value || "").trim();
    if (!text) {
      return;
    }

    fields[key] = fields[key] ? `${fields[key]}\n${text}` : text;
  };

  appendField("setting", parsed.intro);

  for (const section of parsed.sections) {
    const body = String(section.body || "").trim();
    if (!body) {
      continue;
    }

    switch (classifyBackgroundMemoSection(section.title)) {
      case "protagonist":
        appendField("protagonist", body);
        break;
      case "world":
        appendField("world", body);
        break;
      case "rules":
        appendField("rules", body);
        break;
      default:
        appendField("setting", body);
        break;
    }
  }

  return fields;
}

function serializeStoryMemoFields(fields, locale = getCurrentLocale()) {
  const labels = getStoryMemoFieldLabelMap(locale);
  const orderedFields = [
    ["setting", labels.setting],
    ["protagonist", labels.protagonist],
    ["world", labels.world],
    ["rules", labels.rules],
  ];

  return orderedFields
    .map(([key, label]) => {
      const body = String(fields?.[key] || "").trim();
      if (!body) {
        return "";
      }
      return `〖${label}〗\n${body}`;
    })
    .filter(Boolean)
    .join("\n\n");
}

function updateStoryMemoField(sectionKey, value, { preset = false } = {}) {
  const nextFields = getStoryMemoFieldValues(state.storyBackground);
  nextFields[sectionKey] = String(value || "");
  state.storyBackground = serializeStoryMemoFields(nextFields, state.locale);
  saveStoryBackground();
  renderStoryBackgroundEditor();
  state.promptNotice = "物語メモを保存しました。";
}

function classifyBackgroundMemoSection(title) {
  const compact = String(title || "")
    .replace(/\s+/g, "")
    .toLowerCase();

  if (
    compact.includes("ai側が遵守すべき事柄") ||
    compact.includes("遵守すべき事柄") ||
    compact.includes("遵守") ||
    compact.includes("禁止") ||
    compact.includes("rule") ||
    compact.includes("rules")
  ) {
    return "rules";
  }

  if (
    compact.includes("コウシロウ") ||
    compact.includes("主人公") ||
    compact.includes("peategelane") ||
    compact.includes("protagonist") ||
    compact.includes("maincharacter") ||
    compact.includes("hero")
  ) {
    return "protagonist";
  }

  if (
    compact.includes("魔王軍") ||
    compact.includes("世界観") ||
    compact.includes("物語背景") ||
    compact.includes("物語の舞台") ||
    compact.includes("背景") ||
    compact.includes("舞台") ||
    compact.includes("setting") ||
    compact.includes("background") ||
    compact.includes("world") ||
    compact.includes("lore") ||
    compact.includes("keskkond") ||
    compact.includes("taust") ||
    compact.includes("armee") ||
    compact.includes("army")
  ) {
    return "world";
  }

  if (
    compact.includes("登場人物") ||
    compact.includes("キャラ") ||
    compact.includes("tegela") ||
    compact.includes("cast") ||
    compact.includes("character")
  ) {
    return "cast";
  }

  return "context";
}

function buildBackgroundMemoPromptAdditions(backgroundText, locale = getCurrentLocale()) {
  const parsed = parseBackgroundMemoSections(backgroundText);
  const language = normalizeLocale(locale);
  const labels = {
    ja: {
      introHeading: "物語メモの本文:",
      protagonistHeading: "主人公設定:",
      worldHeading: "物語の舞台 / 世界観:",
      castHeading: "登場人物の補足:",
      rulesHeading: "AI側が遵守すべき事柄:",
      otherHeading: "その他の補足:",
      introLabel: "本文",
    },
    en: {
      introHeading: "Memo body:",
      protagonistHeading: "Protagonist notes:",
      worldHeading: "Story setting / world notes:",
      castHeading: "Cast notes:",
      rulesHeading: "Rules the AI must follow:",
      otherHeading: "Other notes:",
      introLabel: "Body",
    },
    et: {
      introHeading: "Märkme sisu:",
      protagonistHeading: "Peategelase märkmed:",
      worldHeading: "Loo keskkond / maailm:",
      castHeading: "Tegelaste märkused:",
      rulesHeading: "AI peab järgima:",
      otherHeading: "Muud märkmed:",
      introLabel: "Sisu",
    },
  }[language] || {
    introHeading: "物語メモの本文:",
    protagonistHeading: "主人公設定:",
    worldHeading: "物語の舞台 / 世界観:",
    castHeading: "登場人物の補足:",
    rulesHeading: "AI側が遵守すべき事柄:",
    otherHeading: "その他の補足:",
    introLabel: "本文",
  };

  const groups = {
    protagonist: [],
    world: [],
    cast: [],
    context: [],
    rules: [],
  };

  if (parsed.intro) {
    groups.world.push({ title: labels.introLabel, body: parsed.intro });
  }

  for (const section of parsed.sections) {
    const body = section.body.trim();
    if (!body) {
      continue;
    }

    const category = classifyBackgroundMemoSection(section.title);
    groups[category] = groups[category] || [];
    groups[category].push({
      title: section.title,
      body,
    });
  }

  const parts = [];
  const orderedGroups = [
    ["protagonist", labels.protagonistHeading],
    ["world", labels.worldHeading],
    ["cast", labels.castHeading],
    ["context", labels.otherHeading],
  ];

  for (const [groupName, heading] of orderedGroups) {
    const entries = groups[groupName] || [];
    if (entries.length === 0) {
      continue;
    }

    const lines = entries.map((entry) => {
      const bodyText = entry.body
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");
      return `- ${entry.title}\n${bodyText}`;
    });

    parts.push([heading, ...lines].join("\n"));
  }

  const ruleEntries = groups.rules || [];
  if (ruleEntries.length > 0) {
    const lines = ruleEntries.map((entry) => {
      const compactBody = entry.body.replace(/\n+/g, " / ");
      return `- ${entry.title}: ${compactBody}`;
    });
    parts.push([labels.rulesHeading, ...lines].join("\n"));
  }

  return parts.join("\n\n");
}

function formatCastPromptLine(character, locale = getCurrentLocale()) {
  const language = normalizeLocale(locale);
  const roleText = getLocalizedCastRole(character.role, locale);
  const personalityText = String(character.personality || "").trim();
  const speechText = String(character.speech || "").trim();
  const memoText = String(character.memo || "").trim().replace(/\n+/g, " / ");
  const memoLabel = language === "en" ? "Notes" : language === "et" ? "Märkused" : "補足";

  if (language === "en") {
    return `- ${character.name}: ${roleText}. ${personalityText}. Voice: ${speechText}${memoText ? ` ${memoLabel}: ${memoText}` : ""}`;
  }

  if (language === "et") {
    return `- ${character.name}: ${roleText}. ${personalityText}. Hääl: ${speechText}${memoText ? ` ${memoLabel}: ${memoText}` : ""}`;
  }

  return `- ${character.name}: ${roleText}。${personalityText}。話し方: ${speechText}${memoText ? `。${memoLabel}: ${memoText}` : ""}`;
}

function loadLocale() {
  const fromUrl = getLocaleFromUrl();
  if (fromUrl) {
    return fromUrl;
  }

  return DEFAULT_LOCALE;
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

function getLocaleFromUrl() {
  try {
    const value = new URLSearchParams(window.location.search).get("lang");
    return value ? normalizeLocale(value) : "";
  } catch {
    return "";
  }
}

function normalizeLocale(value) {
  const cleaned = String(value || "").trim().toLowerCase().replaceAll("-", "_");
  return LOCALE_ALIASES[cleaned] || DEFAULT_LOCALE;
}

function saveLocale() {
  localStorage.setItem(LOCALE_KEY, JSON.stringify(state.locale));
}

function getGreetingText(locale) {
  const language = normalizeLocale(locale);
  if (language === "en") {
    return "Hello. You can talk to Gemini Nano here.";
  }
  if (language === "et") {
    return "Tere. Siin saad Gemini Nano-ga rääkida.";
  }
  return DEFAULT_GREETING_TEXT;
}

function setLocale(nextLocale, { updateUrl = true } = {}) {
  const previousLocale = state.locale;
  const previousBackground = state.storyBackground;
  const previousOpener = state.mockStoryOpener;
  const previousDefaultPlayerName = getDefaultPlayerName(previousLocale);
  const normalized = normalizeLocale(nextLocale);
  if (normalized === state.locale) {
    return;
  }

  state.locale = normalized;

  if (isBuiltInStoryBackground(previousBackground)) {
    state.storyBackground = getLocalizedStoryBackground(normalized, detectBackgroundTheme(previousBackground));
    saveStoryBackground();
  }

  const previousGeneratedOpener = generateMockStoryOpener({
    randomize: false,
    background: previousBackground,
    cast: state.storyCast,
    locale: previousLocale,
  });
  if (previousOpener.trim() === previousGeneratedOpener.trim()) {
    state.mockStoryOpener = generateMockStoryOpener({
      randomize: false,
      background: state.storyBackground,
      cast: state.storyCast,
      locale: normalized,
    });
    saveMockStoryOpener();
  }

  state.storyCast = generateRandomStoryCast();
  saveStoryCast();
  state.promptNotice = "登場人物をランダム生成しました。";

  if (state.playerName === previousDefaultPlayerName) {
    state.playerName = getDefaultPlayerName(normalized);
    savePlayerName();
  }

  saveLocale();

  if (updateUrl) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", normalized);
      history.replaceState({}, "", url.toString());
    } catch {
      // ignore URL update failures
    }
  }

  state.systemPromptText = buildPersonaPrompt();
  saveSystemPromptText();
  render();
  if (state.mode === "native") {
    destroySession();
    void prepareRuntime();
  }
}

function loadSystemPromptText(
  persona = loadPersona(),
  background = DEFAULT_STORY_BACKGROUND,
  cast = DEFAULT_STORY_CAST,
  playerName = "",
  locale = DEFAULT_LOCALE
) {
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

  return buildPersonaPrompt(persona, cast, background, playerName, locale);
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
  const sourceEntries = Array.isArray(entries) ? entries : [];
  const fallback = DEFAULT_STORY_CAST;
  const total = Math.max(fallback.length, sourceEntries.length);

  return Array.from({ length: total }, (_, index) => {
    const defaultCharacter = fallback[index] || {};
    const source = sourceEntries[index] || {};
    const defaultName = defaultCharacter.name || `キャラ${index + 1}`;
    return {
      id: String(source.id || defaultCharacter.id || `cast-${index}`),
      active: typeof source.active === "boolean" ? source.active : index === 0,
      name: String(source.name || defaultName),
      role: String(source.role || defaultCharacter.role || ""),
      personality: String(source.personality || defaultCharacter.personality || ""),
      speech: String(source.speech || defaultCharacter.speech || ""),
      memo: String(source.memo || defaultCharacter.memo || ""),
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
  applyStoryContextSettings("登場人物を保存しました。変更を反映してください。");
}

function applyCastMemoImport() {
  if (!elements.castMemoInput) {
    return;
  }

  const sections = parseCastMemoSections(elements.castMemoInput.value);
  if (sections.length === 0) {
    state.promptNotice = "登場人物メモを見つけられませんでした。";
    renderPromptEditor();
    return;
  }

  state.storyCast = normalizeStoryCast(
    sections.map((section, index) => buildCastMemoCharacter(section, index, state.locale))
  );
  saveStoryCast();
  applyStoryContextSettings("登場人物メモを上書きしました。");
}

function applyBackgroundSettings() {
  applyStoryContextSettings("物語メモを保存しました。");
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
  playerName = state.playerName,
  locale = state.locale
) {
  const preset =
    PERSONA_PRESETS.find((item) => item.id === persona.presetId) || PERSONA_PRESETS[0];
  const custom = persona.customPrompt.trim();
  const castList = getActiveStoryCast(cast).map((character) => ({
    ...character,
    role: getLocalizedCastRole(character.role, locale),
  }));
  const backgroundText = String(background || DEFAULT_STORY_BACKGROUND).trim() || DEFAULT_STORY_BACKGROUND;
  const playerNameText = String(playerName || "").trim();
  const language = normalizeLocale(locale);
  const backgroundMemoAdditions = buildBackgroundMemoPromptAdditions(backgroundText, language);

  if (preset.id === "custom") {
    return custom || getDefaultSystemPrompt(language);
  }

  if (preset.id === "story") {
    if (language === "ja") {
      return [
        buildStoryMasterCorePrompt(language, castList),
        "",
        "固定キャラ定義:",
        ...castList.map((character) => formatCastPromptLine(character, language)),
        "",
        `物語メモ: ${backgroundText}`,
        backgroundMemoAdditions,
        playerNameText ? `プレイヤー名: ${playerNameText}` : "プレイヤー名は未設定です。名前が入るまで、ユーザーを固有名で呼ばないでください。",
        "",
        "追加ルール:",
        "- 返答の先頭に、はい、承知しました / ゲームマスターとして開始します / などの前置きを書かない",
        "- 区切り線、見出し、箇条書き、引用の連続は使わない",
        "- ユーザーに直接問いかけない。『どうしますか』『どこに行きますか』のような質問で終えない",
        "- 最初の返答では、舞台を短く示してから、固定キャラ全員を自然に登場させる",
        "- 2回目以降の返答でも、固定キャラのうち少なくとも2人を登場させる",
        "- 新しい登場人物をむやみに増やさない",
        "- ユーザーの名前や行動を勝手に確定しない",
        "- 会話を通じて物語を少しずつ進める",
      ].join("\n");
    }

    return buildLocalizedStoryPrompt(language, castList, backgroundText, playerNameText);
  }

  if (!custom || preset.id === "default") {
    return getDefaultSystemPrompt(language) || SYSTEM_PROMPT;
  }

  return `${getPersonaBasePrompt(language, preset.id)}\n\n${getPersonaCustomLead(language)}:\n${custom}`;
}

function getLanguageModelApi() {
  return window.LanguageModel || window.ai?.languageModel || null;
}

function getDefaultSystemPrompt(locale = getCurrentLocale()) {
  const language = normalizeLocale(locale);
  if (language === "en") {
    return "You are a kind and concise assistant. Keep the flow of conversation natural and reply in English unless the user asks otherwise.";
  }
  if (language === "et") {
    return "Sa oled sõbralik ja lühike assistent. Hoia vestluse voog loomulikuna ja vasta eesti keeles, kui kasutaja ei palu teisiti.";
  }
  return SYSTEM_PROMPT;
}

function buildStoryMasterCorePrompt(locale, castList = []) {
  const language = normalizeLocale(locale);
  const activeCast = Array.isArray(castList) ? castList.filter(Boolean) : [];
  const castNames = activeCast.map((character) => String(character.name || "").trim()).filter(Boolean);
  const castRoles = activeCast
    .map((character) => `${String(character.name || "").trim()}=${getLocalizedCastRole(character.role, locale)}`)
    .filter((text) => !text.startsWith("="));
  const namesText = castNames.length > 0 ? castNames.join(", ") : (language === "en" ? "the active cast" : language === "et" ? "aktiivsed tegelased" : "有効な登場人物");
  const openingCountText =
      castNames.length > 0
        ? castNames.length === 1
          ? (language === "en" ? "the one active character" : language === "et" ? "üks aktiivne tegelane" : "有効な登場人物1人")
          : (language === "en" ? "all active characters" : language === "et" ? "kõik aktiivsed tegelased" : "有効な登場人物全員")
      : (language === "en" ? "the active cast" : language === "et" ? "aktiivsed tegelased" : "有効な登場人物");
  const replyCastText =
    castNames.length >= 2
      ? (language === "en" ? "at least two fixed characters" : language === "et" ? "vähemalt kaht püsitegelast" : "固定キャラのうち少なくとも2人")
      : castNames.length === 1
        ? (language === "en" ? "the one active character" : language === "et" ? "üks aktiivne tegelane" : "有効な登場人物1人")
        : (language === "en" ? "the active cast" : language === "et" ? "aktiivseid tegelasi" : "有効な登場人物");
  const roleText =
    castRoles.length > 0
      ? castRoles.join(", ")
      : (language === "en" ? "Keep each character's role and voice consistent." : language === "et" ? "Hoia iga tegelase roll ja hääl järjepidev." : "各キャラクターの役割と口調をできるだけ維持してください。");

  if (language === "en") {
    return [
      `You are the Game Master. Guide the story, shift scenes, and describe the characters.`,
      `The fixed cast is: ${namesText}.`,
      roleText,
      `Do not decide the user's actions or feelings.`,
      `Mix short narration with dialogue.`,
      `Keep replies to 2–5 sentences.`,
      `Include ${replyCastText} in each reply, and ${castNames.length > 1 ? `all active characters in the opening scene` : "the active character in the opening scene"}.`,
    ].join(" ");
  }

  if (language === "et") {
    return [
      `Sa oled mängujuhataja. Juhi lugu, vaheta stseene ja kirjelda tegelasi.`,
      `Püsikoosseis on: ${namesText}.`,
      roleText,
      `Ära otsusta kasutaja tegusid ega tundeid.`,
      `Sega lühike jutustus ja dialoog.`,
      `Vastus olgu 2–5 lauset.`,
      `Kasuta igas vastuses ${replyCastText} ja ${castNames.length > 1 ? "avastseenis kõiki aktiivseid tegelasi." : "avastseenis aktiivset tegelast."}`,
    ].join(" ");
  }

  return [
    `あなたはゲームマスターです。物語の進行、場面転換、登場人物の描写を担当してください。`,
    `固定メンバーは${namesText}です。`,
    roleText,
    `ユーザーの行動や感情は勝手に決めず、短い地の文と会話を混ぜてください。`,
    `返答は通常2〜5文で、会話では${replyCastText}を登場させてください。`,
    `最初の場面では${openingCountText}を登場させてください。`,
  ].join("");
}

function getPersonaBasePrompt(locale, presetId) {
  const language = normalizeLocale(locale);
  if (presetId === "story") {
    return buildStoryMasterCorePrompt(language, []);
  }

  if (language === "en") {
    switch (presetId) {
      case "coach":
        return "You are a work coach. Summarize the user's idea, then give the conclusion, next step, and a short caution in that order. Use bullets when helpful.";
      case "reviewer":
        return "You are a careful but strict reviewer. Prioritize weak points, missing pieces, and improvement ideas. Also mention one good point.";
      case "idea":
        return "You are an idea generator. First widen the options, then narrow them down to one recommended answer. Include a few concrete and slightly unexpected ideas.";
      default:
        return "You are a kind and concise assistant. Keep the flow of conversation natural and reply in English unless the user asks otherwise.";
    }
  }

  if (language === "et") {
    switch (presetId) {
      case "coach":
        return "Sa oled tööcoach. Korrasta kasutaja mõte ja anna seejärel järeldus, järgmine samm ning lühike hoiatus selles järjekorras. Kasuta vajadusel punktloendeid.";
      case "reviewer":
        return "Sa oled hoolikas, kuid range retsensent. Toeta eeskätt nõrkade kohtade, puudujääkide ja paranduste leidmist. Maini ka üht head külge.";
      case "idea":
        return "Sa oled ideede genereerija. Laienda esmalt võimalusi ja kitsenda siis üks soovitatud vastuseni. Lisa konkreetseid ja veidi ootamatuid ideid.";
      default:
        return "Sa oled sõbralik ja lühike assistent. Hoia vestluse voog loomulikuna ja vasta eesti keeles, kui kasutaja ei palu teisiti.";
    }
  }

  switch (presetId) {
    case "coach":
      return "あなたは作業コーチです。ユーザーの話を整理し、結論、次の一手、注意点の順で短く答えてください。必要なら箇条書きを使ってください。";
    case "reviewer":
      return "あなたは丁寧だが厳しめのレビュー係です。案の弱い点、足りない点、改善案を優先して返してください。良い点もひとこと添えてください。";
    case "idea":
      return "あなたはアイデア発想係です。まず選択肢を広げ、次におすすめ案を1つに絞って返してください。発想は具体的で、少し意外性のあるものを含めてください。";
    default:
      return SYSTEM_PROMPT;
  }
}

function getPersonaCustomLead(locale) {
  const language = normalizeLocale(locale);
  if (language === "en") {
    return "Additional instructions";
  }
  if (language === "et") {
    return "Lisajuhised";
  }
  return "追加の指示";
}

function buildLocalizedStoryPrompt(locale, castList, backgroundText, playerNameText) {
  if (locale === "en") {
    return [
      buildStoryMasterCorePrompt(locale, castList),
      "",
      "Fixed cast:",
      ...castList.map((character) => formatCastPromptLine(character, locale)),
      "",
      `Story memo: ${backgroundText}`,
      buildBackgroundMemoPromptAdditions(backgroundText, locale),
      playerNameText ? `Player name: ${playerNameText}` : "Player name is not set. Do not call the user by a specific name until it is filled in.",
      "",
      "Rules:",
      "- Do not start with a preface such as 'Sure' or 'As the Game Master'",
      "- Do not use separators, headings, bullet runs, or quoted blocks",
      "- Do not ask the user direct questions at the end",
      "- In the first reply, briefly set the scene and naturally introduce all fixed characters",
      "- In later replies, include at least two fixed characters",
      "- Do not add new characters unnecessarily",
      "- Do not decide the user's actions or feelings",
      "- Advance the story gradually",
      "- Reply in English",
    ].join("\n");
  }

  if (locale === "et") {
    return [
      buildStoryMasterCorePrompt(locale, castList),
      "",
      "Püsikoosseis:",
      ...castList.map((character) => formatCastPromptLine(character, locale)),
      "",
      `Loo taust: ${backgroundText}`,
      buildBackgroundMemoPromptAdditions(backgroundText, locale),
      playerNameText ? `Mängija nimi: ${playerNameText}` : "Mängija nimi pole määratud. Ära kasuta konkreetset nime enne, kui see on täidetud.",
      "",
      "Reeglid:",
      "- Ära alusta eessõnaga nagu 'Muidugi' või 'Mängujuhatajana'",
      "- Ära kasuta eraldusjooni, pealkirju, loetelusid ega tsiteeritud plokke",
      "- Ära lõpeta otsese küsimusega kasutaja poole",
      "- Esimeses vastuses sea lühidalt stseen ja too loomulikult sisse kõik püsitegelased",
      "- Hilisemates vastustes kasuta vähemalt kaht püsitegelast",
      "- Ära lisa tarbetult uusi tegelasi",
      "- Ära otsusta kasutaja tegusid ega tundeid",
      "- Viibi loo kulg järk-järgult edasi",
      "- Vasta eesti keeles",
    ].join("\n");
  }

  return [
    buildStoryMasterCorePrompt(locale, castList),
    "",
    "固定キャラ定義:",
    ...castList.map((character) => formatCastPromptLine(character, locale)),
    "",
    `物語メモ: ${backgroundText}`,
    buildBackgroundMemoPromptAdditions(backgroundText, locale),
    playerNameText ? `プレイヤー名: ${playerNameText}` : "プレイヤー名は未設定です。名前が入るまで、ユーザーを固有名で呼ばないでください。",
    "",
    "追加ルール:",
    "- 返答の先頭に、はい、承知しました / ゲームマスターとして開始します / などの前置きを書かない",
    "- 区切り線、見出し、箇条書き、引用の連続は使わない",
    "- ユーザーに直接問いかけない。『どうしますか』『どこに行きますか』のような質問で終えない",
    "- 最初の返答では、舞台を短く示してから、固定キャラ全員を自然に登場させる",
    "- 2回目以降の返答でも、固定キャラのうち少なくとも2人を登場させる",
    "- 新しい登場人物をむやみに増やさない",
    "- ユーザーの名前や行動を勝手に確定しない",
    "- 会話を通じて物語を少しずつ進める",
  ].join("\n");
}

function createStoryOpenerPrompt(locale = getCurrentLocale()) {
  const castList = getActiveStoryCast(state.storyCast);
  const background = String(state.storyBackground || DEFAULT_STORY_BACKGROUND).trim() || DEFAULT_STORY_BACKGROUND;
  const playerNameText = String(state.playerName || "").trim();
  const language = normalizeLocale(locale);

  if (language !== "ja") {
    return buildLocalizedStoryOpenerPrompt(language, castList, background, playerNameText);
  }

  return [
    "ゲームマスターとして物語を開始してください。",
    "返答の先頭に、はい、承知しました / ゲームマスターとして開始します / などの前置きを書かないでください。",
    "区切り線、見出し、箇条書き、引用の連続は使わないでください。",
    "ユーザーに直接問いかけないでください。『どうしますか』『どこに行きますか』のような質問で終えないでください。",
    "最初の返答では、短い情景描写から始めて、今有効になっている登場人物を自然に登場させてください。",
    "2回目以降の返答でも、追加した登場人物のうち少なくとも2人を登場させてください。",
    "登場人物は固定メンバーとして扱い、名前・口調・役割をこの先も維持してください。",
    `固定キャラ: ${castList.map((character) => character.name).join(" / ")}`,
    `物語メモ: ${background}`,
    buildBackgroundMemoPromptAdditions(background, language),
    playerNameText
      ? `プレイヤー名: ${playerNameText}`
      : "プレイヤー名は未設定です。名前が入るまで物語を開始しないでください。",
    "ユーザーの行動や感情は決めつけず、会話が自然に続く短い余韻で締めてください。",
    "返答は日本語で、2〜5文程度にしてください。",
  ].join("\n");
}

function buildLocalizedStoryOpenerPrompt(locale, castList, background, playerNameText) {
  if (locale === "en") {
    return [
      "Start the story as the Game Master.",
      "Do not begin with a preface such as 'Sure' or 'As the Game Master'.",
      "Do not use separators, headings, bullet runs, or quoted blocks.",
      "Do not end with a direct question to the user.",
      "Begin with a short scene description and naturally introduce the active cast.",
      "In later replies, include at least two of the fixed characters.",
      "Treat the characters as fixed cast members and keep their names, voices, and roles consistent.",
      `Fixed cast: ${castList.map((character) => character.name).join(" / ")}`,
      `Story memo: ${background}`,
      buildBackgroundMemoPromptAdditions(background, locale),
      playerNameText ? `Player name: ${playerNameText}` : "Player name is not set. Do not start the story until it is filled in.",
      "Do not decide the user's actions or emotions for them.",
      "Keep the story moving with short narration and dialogue.",
      "Reply in English, with 2–5 sentences.",
    ].join("\n");
  }

  return [
    "Alusta lugu mängujuhina.",
    "Ära alusta eessõnaga nagu 'Muidugi' või 'Mängujuhatajana'.",
    "Ära kasuta eraldusjooni, pealkirju, loetelusid ega tsiteeritud plokke.",
    "Ära lõpeta otsese küsimusega kasutaja poole.",
    "Alusta lühikese stseenikirjeldusega ja too loomulikult sisse aktiivsed tegelased.",
    "Hiljem kasuta vähemalt kaht püsitegelast.",
    "Hoia tegelaste nimed, hääled ja rollid järjepidevad.",
    `Püsikoosseis: ${castList.map((character) => character.name).join(" / ")}`,
    `Loo taust: ${background}`,
    buildBackgroundMemoPromptAdditions(background, locale),
    playerNameText ? `Mängija nimi: ${playerNameText}` : "Mängija nimi pole määratud. Ära alusta lugu enne, kui see on täidetud.",
    "Ära otsusta kasutaja tegusid ega tundeid.",
    "Hoia lugu liikumas lühikese jutustuse ja dialoogiga.",
    "Vasta eesti keeles, 2–5 lausega.",
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
  state.storyBeatIndex = 0;
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
    .replace(/^---+$/gm, "")
    .replace(/^[-—]{3,}\s*$/gm, "")
    .replace(/^はい[、,]?\s*承知しました[。！？!]?$/gm, "")
    .replace(/^ゲームマスターとして物語を開始します[。！？!]?$/gm, "")
    .replace(/^ゲームマスターとして開始します[。！？!]?$/gm, "")
    .replace(/^コウシロウ、あなたは.*$/gm, "")
    .replace(/^あなたは扉に近づきますか.*$/gm, "")
    .replace(/^それとも、駅の喧騒の中、何かを探しますか.*$/gm, "")
    .replace(/[「『]?(?:どうしますか|何をしますか|どうする|何をする)[？?][」』]?/g, "")
    .replace(/[？?]/g, "。")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (cleaned) {
    return cleaned;
  }

  return "ミナは淡い青色の扉を見つめた。静かな気配だけが、次の一歩を待っている。";
}

function createMockStoryReply(userText) {
  const language = normalizeLocale(state.locale);
  if (language !== "ja") {
    return createLocalizedMockStoryReply(userText, language);
  }

  const theme = detectBackgroundTheme(state.storyBackground);
  const activeCast = getActiveStoryCast();
  const [first, second, third] = activeCast;
  const beat = Math.max(0, state.storyBeatIndex - 1);
  const leadName = first?.name || "ミナ";
  const reaction = buildStoryReactionLine(String(userText || ""), leadName);
  const progress = pickStoryProgressLine(theme, beat, leadName);
  const movement = buildStoryMovementLine(theme, beat, first, second, third, leadName);

  state.storyBeatIndex += 1;

  return [reaction, progress, movement].join("\n");
}

function createMockStoryOpener() {
  const language = normalizeLocale(state.locale);
  if (language !== "ja") {
    return state.mockStoryOpener.trim() || generateMockStoryOpener({
      randomize: false,
      background: state.storyBackground,
      cast: state.storyCast,
      locale: language,
    });
  }

  return (
    state.mockStoryOpener.trim() ||
    generateMockStoryOpener({
      randomize: false,
      background: state.storyBackground,
      cast: state.storyCast,
    })
  );
}

function createLocalizedMockStoryReply(userText, locale) {
  const activeCast = getActiveStoryCast();
  const [first, second, third] = activeCast;
  const leadName = first?.name || "Mina";
  const background = String(state.storyBackground || DEFAULT_STORY_BACKGROUND).trim() || DEFAULT_STORY_BACKGROUND;
  const scene = getLocalizedStoryScene(locale, background);
  const place = getLocalizedStoryPlace(locale, background);
  const reaction = getLocalizedStoryReaction(locale, leadName, userText);
  const movement = getLocalizedStoryMovement(locale, leadName, second, third, place);
  state.storyBeatIndex += 1;
  return [reaction, scene, movement].join("\n");
}

function isStoryOpenerPrompt(value) {
  return String(value || "").includes("ゲームマスターとして物語を開始してください。");
}

function getLocalizedStoryScene(locale, background, randomize = false) {
  const language = normalizeLocale(locale);
  const cleanBackground = String(background || DEFAULT_STORY_BACKGROUND).trim() || DEFAULT_STORY_BACKGROUND;
  if (language === "en") {
    const options = [
      `In the evening light, ${cleanBackground}.`,
      `At dusk, ${cleanBackground}.`,
      `The story opens quietly: ${cleanBackground}.`,
    ];
    return randomize ? pickRandom(options) : options[0];
  }

  if (language === "et") {
    const options = [
      `Õhtuhämaruses, ${cleanBackground}.`,
      `Videvikus, ${cleanBackground}.`,
      `Lugu algab vaikselt: ${cleanBackground}.`,
    ];
    return randomize ? pickRandom(options) : options[0];
  }

  return cleanBackground;
}

function getLocalizedStoryPlace(locale, background = DEFAULT_STORY_BACKGROUND) {
  const language = normalizeLocale(locale);
  const backgroundText = String(background || DEFAULT_STORY_BACKGROUND).trim() || DEFAULT_STORY_BACKGROUND;
  const theme = detectBackgroundTheme(backgroundText);
  const placeMap = {
    station: {
      en: "the station concourse",
      et: "jaamahoone koridor",
    },
    port: {
      en: "the harbor warehouses",
      et: "sadamalaod",
    },
    castle: {
      en: "the back streets of the castle town",
      et: "lossilinna tagatänavad",
    },
    future: {
      en: "the maintenance passage under the overpass",
      et: "ülekäigu all olev hoolduskäik",
    },
    academy: {
      en: "the library tower staircase",
      et: "raamatukogutorni trepikoda",
    },
    desert: {
      en: "the rocks off the trade road",
      et: "kaubatee ääres olevad kivimid",
    },
    default: {
      en: "the next place",
      et: "järgmine koht",
    },
  };

  return placeMap[theme]?.[language] || placeMap.default[language] || "the next place";
}

function getLocalizedStorySpotlight(locale, leadName, second, third, randomize = false) {
  const language = normalizeLocale(locale);
  const secondName = second?.name || "";
  const thirdName = third?.name || "";
  if (language === "en") {
    const options = [
      `${leadName} steps forward and checks the atmosphere. ${secondName || "Rei"} keeps watch, and ${thirdName || "Shio"} notices the smallest detail.`,
      `${leadName} nods once. ${secondName || "Rei"} scans the area, while ${thirdName || "Shio"} listens for the quietest clue.`,
      `${leadName} looks toward the door. ${secondName || "Rei"} and ${thirdName || "Shio"} stay close, ready to move.`,
    ];
    return randomize ? pickRandom(options) : options[0];
  }
  if (language === "et") {
    const options = [
      `${leadName} astub ette ja tunnetab õhku. ${secondName || "Rei"} hoiab ümbrusel silma peal ning ${thirdName || "Shio"} märkab pisimatki detaili.`,
      `${leadName} noogutab vaikselt. ${secondName || "Rei"} jälgib ümbrust ja ${thirdName || "Shio"} kuulab kõige vaiksemat märki.`,
      `${leadName} vaatab ukse poole. ${secondName || "Rei"} ja ${thirdName || "Shio"} püsivad lähedal, valmis liikuma.`,
    ];
    return randomize ? pickRandom(options) : options[0];
  }
  return "";
}

function getLocalizedStoryClosing(locale, place, randomize = false) {
  const language = normalizeLocale(locale);
  if (language === "en") {
    const options = [
      `The next clue seems to be waiting at ${place}.`,
      `The story is already moving toward ${place}.`,
      `A small change in the air points toward ${place}.`,
    ];
    return randomize ? pickRandom(options) : options[0];
  }
  if (language === "et") {
    const options = [
      `Järgmine vihje paistab ootavat kohas ${place}.`,
      `Lugu liigub juba ${place} poole.`,
      `Õhus olev väike muutus viitab ${place}-le.`,
    ];
    return randomize ? pickRandom(options) : options[0];
  }
  return "";
}

function getLocalizedStoryReaction(locale, leadName, userText) {
  const language = normalizeLocale(locale);
  const trimmed = String(userText || "").trim();
  if (language === "en") {
    if (!trimmed) return `${leadName} gives a small nod.`;
    if (/(where|go|move|head|walk)/i.test(trimmed)) return `${leadName} points toward the next path.`;
    if (/(check|look|search|inspect)/i.test(trimmed)) return `${leadName} starts scanning the area for clues.`;
    if (/(door|open|touch)/i.test(trimmed)) return `${leadName} turns toward the blue door.`;
    return `${leadName} quietly signals that it is time to move.`;
  }
  if (language === "et") {
    if (!trimmed) return `${leadName} noogutab vaikselt.`;
    if (/(kuhu|minema|liik|mine|jaluta)/i.test(trimmed)) return `${leadName} osutab järgmise tee suunas.`;
    if (/(vaata|otsi|kontroll|uuri)/i.test(trimmed)) return `${leadName} hakkab ümbrust vihjete jaoks jälgima.`;
    if (/(uks|ava|puuduta)/i.test(trimmed)) return `${leadName} pöördub sinise ukse poole.`;
    return `${leadName} annab vaikse märguande, et on aeg liikuda.`;
  }
  return `${leadName}が、次に動くための合図を静かに送った。`;
}

function getLocalizedStoryMovement(locale, leadName, second, third, place) {
  const language = normalizeLocale(locale);
  const secondName = second?.name || "";
  const thirdName = third?.name || "";
  if (language === "en") {
    if (secondName && thirdName) {
      return `${secondName} keeps watch while ${thirdName} follows the trail of energy. ${leadName} heads toward ${place}.`;
    }
    if (secondName) {
      return `${secondName} nods and walks with ${leadName} toward ${place}.`;
    }
    return `${leadName} starts moving toward ${place}.`;
  }
  if (language === "et") {
    if (secondName && thirdName) {
      return `${secondName} valvab ümbrust, samal ajal kui ${thirdName} jälgib energiajälge. ${leadName} liigub ${place}-i poole.`;
    }
    if (secondName) {
      return `${secondName} noogutab ja liigub koos ${leadName}-ga ${place}-i poole.`;
    }
    return `${leadName} hakkab liikuma ${place}-i poole.`;
  }
  return "";
}

function buildStoryReactionLine(userText, leadName) {
  const lowered = userText.replace(/\s+/g, "");

  if (!lowered) {
    return `${leadName}が小さくうなずいた。`;
  }

  if (/[ど何]こ/.test(lowered) || /行/.test(lowered)) {
    return `${leadName}が扉ではなく、その先の通路を指さした。`;
  }

  if (/調べ|見|確認|探/.test(lowered)) {
    return `${leadName}が周囲を見回し、気になる手がかりを探し始めた。`;
  }

  if (/扉|開/.test(lowered)) {
    return `${leadName}が淡い青の扉へ視線を向けた。`;
  }

  return `${leadName}が、次に動くための合図を静かに送った。`;
}

function pickStoryProgressLine(theme, beat, leadName) {
  const lines = STORY_PROGRESS_LINES[theme] || STORY_PROGRESS_LINES.default;
  const index = Math.min(beat, lines.length - 1);
  return lines[index].replaceAll("ミナ", leadName);
}

function buildStoryMovementLine(theme, beat, first, second, third, leadName) {
  const placeByTheme = {
    station: ["連絡通路", "裏通路", "保守階段", "地下の小部屋"],
    port: ["倉庫街", "波止場の奥", "船着き場", "潮溜まりの路地"],
    castle: ["裏路地", "蔵の前", "塀の陰", "古い門の先"],
    future: ["保守通路", "高架の下", "監視デッキ", "端末の死角"],
    academy: ["図書塔の裏階段", "中庭の奥", "古い回廊", "塔の上階"],
    desert: ["岩陰", "古い標識の先", "遺跡の入口", "砂丘の向こう"],
    default: ["静かな通路", "気になる場所", "少し奥まった一角", "まだ見えない先"],
  };

  const places = placeByTheme[theme] || placeByTheme.default;
  const place = places[Math.min(beat, places.length - 1)];
  const secondName = second?.name || "";
  const thirdName = third?.name || "";

  if (secondName && thirdName) {
    return `${secondName}は周囲を見張り、${thirdName}は残る気配を拾いながら、${leadName}の後を追う。`;
  }

  if (secondName) {
    return `${secondName}が静かにうなずき、${leadName}と一緒に${place}へ向かう。`;
  }

  return `${leadName}はそのまま${place}へ歩き出した。`;
}

function setMockStoryOpener(value) {
  state.mockStoryOpener = String(value || "").trim();
  saveMockStoryOpener();
  renderMockStoryOpenerEditor();
}

function generateMockStoryOpener({ randomize = false, background = DEFAULT_STORY_BACKGROUND, cast = DEFAULT_STORY_CAST, locale = getCurrentLocale() } = {}) {
  const language = normalizeLocale(locale);
  const backgroundText = getStoryBackgroundCoreText(background);
  if (language !== "ja") {
    return generateLocalizedMockStoryOpener({
      randomize,
      background: backgroundText,
      cast,
      locale: language,
    });
  }

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

function generateLocalizedMockStoryOpener({ randomize = false, background = DEFAULT_STORY_BACKGROUND, cast = DEFAULT_STORY_CAST, locale = "en" } = {}) {
  const backgroundText = getStoryBackgroundCoreText(background);
  const castList = getActiveStoryCast(cast);
  const [first, second, third] = castList;
  const leadName = first?.name || (locale === "et" ? "Mina" : "Mina");
  const scene = getLocalizedStoryScene(locale, backgroundText, randomize);
  const place = getLocalizedStoryPlace(locale, backgroundText);
  const spotlight = getLocalizedStorySpotlight(locale, leadName, second, third, randomize);
  const closing = getLocalizedStoryClosing(locale, place, randomize);
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
  const currentCast = state.storyCast || DEFAULT_STORY_CAST;
  const locale = getCurrentLocale();
  const localizedProfile = getCastRandomizationProfile(locale);

  if (localizedProfile) {
    const themeTag = localizedProfile.themeTags[theme] || localizedProfile.themeTags.default;
    return ["guide", "caution", "observe"].map((roleKey, index) => {
      const current = currentCast[index] || {};
      const rolePool = localizedProfile[roleKey];
      return {
        id: `${theme}-${index}-${roleKey}`,
        active: typeof current.active === "boolean" ? current.active : index === 0,
        name: pickRandom(rolePool.names),
        role: getLocalizedCastRole(roleKey === "guide" ? "案内役" : roleKey === "caution" ? "警戒役" : "観察役", locale),
        personality: pickCastText(rolePool.personalities, themeTag),
        speech: pickCastText(rolePool.speech, themeTag),
        memo: "",
      };
    });
  }

  const templates = STORY_CAST_VARIANTS[theme] || STORY_CAST_VARIANTS.default;

  return templates.map((slotTemplates, index) => {
    const template = pickRandom(slotTemplates);
    const current = currentCast[index] || {};
    return {
      id: `${theme}-${index}-${template.name}`,
      active: typeof current.active === "boolean" ? current.active : index === 0,
      name: template.name,
      role: getLocalizedCastRole(template.role, locale),
      personality: template.personality,
      speech: template.speech,
      memo: "",
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
    const greetings = [
      DEFAULT_GREETING_TEXT,
      getGreetingText("en"),
      getGreetingText("et"),
    ];
    return (
      onlyMessage.role === "assistant" &&
      greetings.includes(onlyMessage.text.trim())
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
