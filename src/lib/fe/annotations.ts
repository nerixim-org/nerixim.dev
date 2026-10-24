// Our own layer over IPA's published questions. The Japanese text itself lives in ipa-source.json
// and is copied verbatim from IPA's PDF. Markup: {surface|reading in hiragana|gloss in this sentence}.
// Glosses are machine-drafted and not yet reviewed by a human.

export type Topic = "Technology" | "Management" | "Strategy"

export type Annotation = {
  id: string
  topic: Topic
  stem: string
  choices: [string, string, string, string]
  stemEn: string
  choicesEn: [string, string, string, string]
  terms: { ja: string; en: string }[]
  pattern: { ja: string; en: string }
  explanation: string
  ownKey: "ア" | "イ" | "ウ" | "エ"
}

export const annotations: Annotation[] = [
  {
    id: "r5-q07",
    topic: "Technology",
    stem: "{トランザクション||transaction}が，{データベース||database}に対する{更新処理|こうしんしょり|update processing}を{完全|かんぜん|completely}に{行う|おこなう|carry out}か，{全く|まったく|at all (with a negative)}{処理|しょり|processing}しなかった{かのように|かのように|as if}{取り消す|とりけす|cancel, roll back}か，のどちらかの結果になることを{保証|ほしょう|guarantee}する{特性|とくせい|property}はどれか。",
    choices: [
      "{一貫性|いっかんせい|consistency}（consistency）",
      "{原子性|げんしせい|atomicity: all or nothing}（atomicity）",
      "{耐久性|たいきゅうせい|durability}（durability）",
      "{独立性|どくりつせい|isolation}（isolation）",
    ],
    stemEn:
      "Which property guarantees that a transaction either performs its update processing on the database completely, or is cancelled as if nothing had been processed at all?",
    choicesEn: ["Consistency", "Atomicity", "Durability", "Isolation"],
    terms: [
      { ja: "原子性", en: "atomicity" },
      { ja: "一貫性", en: "consistency" },
      { ja: "耐久性", en: "durability" },
      { ja: "独立性", en: "isolation" },
    ],
    pattern: { ja: "かのように", en: "as if (it had not happened)" },
    explanation:
      "These are the four ACID properties. Atomicity means a transaction is all-or-nothing: it either commits fully or is rolled back as if it never ran. Consistency keeps the data valid, durability keeps committed data through a failure, and isolation hides concurrent transactions from each other.",
    ownKey: "イ",
  },
  {
    id: "r5-q12",
    topic: "Technology",
    stem: "{アジャイル開発手法|アジャイルかいはつしゅほう|agile development method}の{スクラム||Scrum}において，{開発チーム|かいはつチーム|development team}の全員が{1人ずつ|ひとりずつ|one by one}“{昨日|きのう|yesterday}やったこと”，“{今日|きょう|today}やること”，“{障害|しょうがい|obstacle (blocker)}になっていること”などを{話し|はなし|talk about}，全員でプロジェクトの{状況|じょうきょう|status}を{共有|きょうゆう|share}する{イベント||event (a Scrum meeting)}はどれか。",
    choices: [
      "{スプリントプランニング||Sprint Planning}",
      "{スプリントレビュー||Sprint Review}",
      "{デイリースクラム||Daily Scrum}",
      "{レトロスペクティブ||Retrospective}",
    ],
    stemEn:
      "In Scrum, an agile method: which event has every member of the development team say, one by one, what they did yesterday, what they will do today and what is blocking them, so that everyone shares the project's status?",
    choicesEn: ["Sprint Planning", "Sprint Review", "Daily Scrum", "Retrospective"],
    terms: [
      { ja: "デイリースクラム", en: "Daily Scrum" },
      { ja: "障害になっていること", en: "impediments (blockers)" },
      { ja: "スプリントレビュー", en: "Sprint Review" },
    ],
    pattern: { ja: "はどれか", en: "which of these is...? (the standard closing)" },
    explanation:
      "The Daily Scrum is the short daily sync: yesterday, today, blockers. Sprint Planning decides what goes into the sprint, the Review shows the increment to stakeholders, and the Retrospective improves the team's way of working.",
    ownKey: "ウ",
  },
  {
    id: "r6-q08",
    topic: "Technology",
    stem: "{LAN間接続装置|ランかんせつぞくそうち|devices that connect LANs}に{関する|かんする|concerning}{記述|きじゅつ|statement}のうち，{適切|てきせつ|appropriate}なものはどれか。",
    choices: [
      "{ゲートウェイ||gateway}は，{OSI基本参照モデル|オーエスアイきほんさんしょうモデル|OSI reference model}における{第1～3層|だいいち～さんそう|layers 1 to 3}だけの{プロトコル||protocol}を{変換|へんかん|convert}する。",
      "{ブリッジ||bridge}は，{IPアドレス||IP address}を{基にして|もとにして|based on}{フレーム||frame}を{中継|ちゅうけい|relay}する。",
      "{リピータ||repeater}は，{同種|どうしゅ|same kind}の{セグメント間|セグメントかん|between segments}で{信号|しんごう|signal}を{増幅|ぞうふく|amplify}することによって{伝送距離|でんそうきょり|transmission distance}を{延長|えんちょう|extend}する。",
      "{ルータ||router}は，{MACアドレス|マックアドレス|MAC address}を基にしてフレームを中継する。",
    ],
    stemEn: "Which of these statements about devices that connect LANs is appropriate?",
    choicesEn: [
      "A gateway converts only the protocols of layers 1 to 3 of the OSI reference model.",
      "A bridge relays frames based on IP addresses.",
      "A repeater extends the transmission distance by amplifying signals between segments of the same kind.",
      "A router relays frames based on MAC addresses.",
    ],
    terms: [
      { ja: "リピータ", en: "repeater (layer 1)" },
      { ja: "ブリッジ", en: "bridge (layer 2, MAC addresses)" },
      { ja: "ルータ", en: "router (layer 3, IP addresses)" },
      { ja: "ゲートウェイ", en: "gateway" },
      { ja: "中継", en: "relay, forward" },
    ],
    pattern: { ja: "のうち，適切なものはどれか", en: "of these, which one is appropriate?" },
    explanation:
      "A repeater only amplifies the signal at layer 1. A bridge forwards by MAC address (layer 2) and a router by IP address (layer 3), so two of the choices swap them. A gateway can convert protocols up to the application layer, not just layers 1 to 3.",
    ownKey: "ウ",
  },
  {
    id: "r6-q11",
    topic: "Technology",
    stem: "{階層構造|かいそうこうぞう|hierarchical structure}の{モジュール群|モジュールぐん|group of modules}から{成る|なる|consisting of}ソフトウェアの{結合テスト|けつごうテスト|integration test}を，{上位|じょうい|higher-level}のモジュールから{行う|おこなう|carry out}。この{場合|ばあい|case}に{使用|しよう|use}する，{下位|かい|lower-level}のモジュールの{代替|だいたい|substitute}となる{テスト用|テストよう|for testing}のモジュールはどれか。",
    choices: [
      "{エミュレータ||emulator}",
      "{シミュレータ||simulator}",
      "{スタブ||stub}",
      "{ドライバ||driver (test driver)}",
    ],
    stemEn:
      "Integration testing of software made of modules in a hierarchy is done starting from the higher-level modules. Which test module is used in that case as a substitute for a lower-level module?",
    choicesEn: ["Emulator", "Simulator", "Stub", "Driver"],
    terms: [
      { ja: "スタブ", en: "stub" },
      { ja: "ドライバ", en: "driver (test driver)" },
      { ja: "結合テスト", en: "integration test" },
      { ja: "上位", en: "higher-level (caller side)" },
      { ja: "下位", en: "lower-level (callee side)" },
    ],
    pattern: { ja: "から成る", en: "consisting of" },
    explanation:
      "Testing top-down means the lower modules do not exist yet, so stubs stand in for the modules being called. In bottom-up testing the missing piece is the caller, and that is a driver.",
    ownKey: "ウ",
  },
  {
    id: "r7-q01",
    topic: "Technology",
    stem: "{大規模言語モデル|だいきぼげんごモデル|large language model (LLM)}を{用いた|もちいた|using}{自然言語処理|しぜんげんごしょり|natural language processing}において，{事前学習済み|じぜんがくしゅうずみ|already pre-trained}のモデルに{対して|たいして|to}{行う|おこなう|carry out}，{ファインチューニング||fine-tuning}に{関する|かんする|concerning}{記述|きじゅつ|statement}として，{最も|もっとも|most}{適切|てきせつ|appropriate}なものはどれか。",
    choices: [
      "{強化学習|きょうかがくしゅう|reinforcement learning}を{行い|おこない|do}，{最適|さいてき|optimal}な{結果|けっか|result}が{得られる|えられる|can be obtained}ようにする。",
      "{事前学習|じぜんがくしゅう|pre-training}と{同じ|おなじ|same}データを{繰り返し|くりかえし|repeatedly}{用いて|もちいて|using}{学習|がくしゅう|training}を行い，モデルの{精度|せいど|accuracy}を{高める|たかめる|raise}ようにする。",
      "{大量|たいりょう|large amount of}のテキストデータを用いて学習を行い，モデルの精度を高めるようにする。",
      "{特定|とくてい|specific}のデータを用いて{追加|ついか|additional}で学習を行い，{目的|もくてき|intended}とする{タスク||task}に{適用|てきよう|apply}できるようにする。",
    ],
    stemEn:
      "Which is the most appropriate statement about fine-tuning, done to a pre-trained model in natural language processing with a large language model?",
    choicesEn: [
      "Do reinforcement learning so that the best result is obtained.",
      "Train repeatedly on the same data as the pre-training to raise the model's accuracy.",
      "Train on a large amount of text data to raise the model's accuracy.",
      "Train additionally on specific data so that the model can be applied to the intended task.",
    ],
    terms: [
      { ja: "ファインチューニング", en: "fine-tuning" },
      { ja: "事前学習", en: "pre-training" },
      { ja: "強化学習", en: "reinforcement learning" },
      { ja: "大規模言語モデル", en: "large language model (LLM)" },
      { ja: "精度", en: "accuracy" },
    ],
    pattern: {
      ja: "に関する記述として，最も適切なものはどれか",
      en: "which is the most appropriate statement about...?",
    },
    explanation:
      "Fine-tuning continues the training of an already pre-trained model on a narrower dataset so it fits one task. A large generic text corpus describes pre-training, and reinforcement learning is a different training method.",
    ownKey: "エ",
  },
  {
    id: "r7-q08",
    topic: "Technology",
    stem: "HTTPと{HTTPS||HTTP over TLS (encrypted HTTP)}を{比較|ひかく|compare}した{場合において|ばあいにおいて|in the case of}，HTTPS{だけがもつ|だけがもつ|that only (HTTPS) has}{特徴|とくちょう|feature}を{示した|しめした|shows}ものはどれか。",
    choices: [
      "{cookie||cookie}に{保存|ほぞん|stored}されている{情報|じょうほう|information}を{用いた|もちいた|using}{セッション管理|セッションかんり|session management}が{可能|かのう|possible}である。",
      "IDとパスワードによって{利用者|りようしゃ|user}の{認証|にんしょう|authentication}を{行う|おこなう|carry out}ことが可能である。",
      "Webブラウザで{キャッシュ||cache}させることによって{通信量|つうしんりょう|traffic volume}を{減らす|へらす|reduce}ことが可能である。",
      "{通信相手先サーバ|つうしんあいてさきサーバ|the server being communicated with}を{サーバ証明書|サーバしょうめいしょ|server certificate}によって{確認|かくにん|verify}することが可能である。",
    ],
    stemEn: "Comparing HTTP and HTTPS, which choice shows a feature that only HTTPS has?",
    choicesEn: [
      "Session management using information stored in a cookie is possible.",
      "Authenticating the user with an ID and password is possible.",
      "Reducing traffic by letting the web browser cache is possible.",
      "Verifying the server you are talking to by its server certificate is possible.",
    ],
    terms: [
      { ja: "サーバ証明書", en: "server certificate" },
      { ja: "認証", en: "authentication" },
      { ja: "通信量", en: "traffic volume" },
      { ja: "セッション管理", en: "session management" },
    ],
    pattern: { ja: "だけがもつ", en: "that only X has" },
    explanation:
      "HTTPS adds TLS, and with it the server proves its identity through its certificate. Cookies, ID and password login and browser caching all work over plain HTTP too.",
    ownKey: "エ",
  },
  {
    id: "r7-q09",
    topic: "Technology",
    stem: "{暗号|あんごう|cryptography}の{危殆化|きたいか|compromise (weakening until no longer safe)}に{該当|がいとう|fall under}するものはどれか。",
    choices: [
      "ある{CA||certificate authority}で{デジタル証明書|デジタルしょうめいしょ|digital certificate}の{署名|しょめい|signature}に使っている{公開鍵|こうかいかぎ|public key}のデジタル証明書の{有効期限|ゆうこうきげん|expiry date}が{切れた|きれた|expired}。",
      "ある{暗号アルゴリズム|あんごうアルゴリズム|cryptographic algorithm}の{秘密鍵|ひみつかぎ|private key}が{不正アクセス|ふせいアクセス|unauthorized access}によって{漏えい|ろうえい|leaked}した。",
      "あるハッシュ関数においてハッシュ値が{同じ|おなじ|same}になるデータの{組み|くみ|pair}を{現実的|げんじつてき|realistic}な{時間内|じかんない|within a time}で{発見|はっけん|find}する{方法|ほうほう|method}が{見つかった|みつかった|was found}。",
      "あるランサムウェアの{一種|いっしゅ|a kind of}で{暗号化|あんごうか|encrypted}されたファイルの{復号鍵|ふくごうかぎ|decryption key}が{公開|こうかい|published}された。",
    ],
    stemEn: "Which of these is a compromise (危殆化) of a cryptographic method?",
    choicesEn: [
      "The digital certificate of the public key that a CA uses to sign digital certificates has expired.",
      "The private key of a cryptographic algorithm was leaked through unauthorized access.",
      "A method was found to discover, in realistic time, pairs of data that give the same hash value for a given hash function.",
      "The decryption key for files encrypted by a certain ransomware was published.",
    ],
    terms: [
      { ja: "危殆化", en: "cryptographic compromise (the method is no longer safe)" },
      { ja: "ハッシュ値", en: "hash value" },
      { ja: "復号鍵", en: "decryption key" },
      { ja: "秘密鍵", en: "private key" },
    ],
    pattern: { ja: "に該当する", en: "falls under / corresponds to" },
    explanation:
      "危殆化 means that advances in attack techniques have made an algorithm or key length unsafe. Finding collisions in a hash function in realistic time is exactly that. An expired certificate, a single leaked key and a published ransomware key are incidents, not a weakening of the cryptography itself.",
    ownKey: "ウ",
  },
  {
    id: "r7-q12",
    topic: "Technology",
    stem: "{オブジェクト指向|オブジェクトしこう|object-oriented}プログラミングの{特徴|とくちょう|feature}のうち，{異なる|ことなる|different}クラスの{オブジェクト||object}を{同一|どういつ|same}の{インタフェース||interface}で{操作|そうさ|operate}したときに，{操作対象|そうさたいしょう|target of the operation}クラスに{応じた|おうじた|corresponding to}{異なる動作|ことなるどうさ|different behavior}を{可能|かのう|possible}にすることを{何と呼ぶか|なんとよぶか|what is it called?}。",
    choices: [
      "{委譲|いじょう|delegation}",
      "{継承|けいしょう|inheritance}",
      "{コンポジション||composition}",
      "{多相性|たそうせい|polymorphism}",
    ],
    stemEn:
      "Among the features of object-oriented programming, what is it called when objects of different classes are operated through the same interface and behave differently according to their class?",
    choicesEn: ["Delegation", "Inheritance", "Composition", "Polymorphism"],
    terms: [
      { ja: "多相性", en: "polymorphism" },
      { ja: "継承", en: "inheritance" },
      { ja: "委譲", en: "delegation" },
      { ja: "インタフェース", en: "interface" },
    ],
    pattern: { ja: "を何と呼ぶか", en: "what is X called?" },
    explanation:
      "The same call producing class-specific behavior is polymorphism (多相性, also written ポリモーフィズム). Inheritance reuses a parent class, delegation hands work to another object, composition builds an object out of others.",
    ownKey: "エ",
  },
  {
    id: "r7-q13",
    topic: "Technology",
    stem: "{アジャイル開発手法|アジャイルかいはつしゅほう|agile development method}の{一つ|ひとつ|one of}である{スクラム||Scrum}において，{プロダクトバックログアイテム||product backlog item}の{内容|ないよう|content}や{並び順|ならびじゅん|order}を{決定|けってい|decide}する{役割|やくわり|role}をもつのは{誰|だれ|who}か。",
    choices: [
      "{開発者|かいはつしゃ|developer}",
      "{顧客|こきゃく|customer}",
      "{スクラムマスタ||Scrum Master}",
      "{プロダクトオーナ||Product Owner}",
    ],
    stemEn:
      "In Scrum, one of the agile methods, who has the role of deciding the content and order of the product backlog items?",
    choicesEn: ["Developers", "Customer", "Scrum Master", "Product Owner"],
    terms: [
      { ja: "プロダクトオーナ", en: "Product Owner" },
      { ja: "スクラムマスタ", en: "Scrum Master" },
      { ja: "プロダクトバックログアイテム", en: "product backlog item" },
    ],
    pattern: { ja: "を決定する役割をもつのは誰か", en: "who has the role of deciding X?" },
    explanation:
      "The Product Owner owns the product backlog: what is in it and in what order. Developers build, the Scrum Master coaches the process, and the customer is not a Scrum role. Note the JIS-style spelling without the final long vowel (オーナ, マスタ).",
    ownKey: "エ",
  },
  {
    id: "r8-q05",
    topic: "Technology",
    stem: "{仮想記憶方式|かそうきおくほうしき|virtual memory}のコンピュータシステムにおいて，{処理の多重度|しょりのたじゅうど|degree of multiprogramming}を{増やしたところ|ふやしたところ|when it was increased, (then)}，{ページイン||page-in}，{ページアウト||page-out}が{多発|たはつ|occur frequently}して，システムの{応答速度|おうとうそくど|response speed}が{急激|きゅうげき|sharply}に{遅く|おそく|slow}なった。このような{現象|げんしょう|phenomenon}を{何というか|なんというか|what is it called?}。",
    choices: [
      "{オーバレイ||overlay}",
      "{スラッシング||thrashing}",
      "{メモリコンパクション||memory compaction}",
      "{ロールアウト||roll-out (swap-out)}",
    ],
    stemEn:
      "In a virtual memory system, raising the degree of multiprogramming caused frequent page-ins and page-outs, and the response speed dropped sharply. What is this phenomenon called?",
    choicesEn: ["Overlay", "Thrashing", "Memory compaction", "Roll-out"],
    terms: [
      { ja: "スラッシング", en: "thrashing" },
      { ja: "処理の多重度", en: "degree of multiprogramming" },
      { ja: "ページアウト", en: "page-out" },
      { ja: "仮想記憶", en: "virtual memory" },
    ],
    pattern: { ja: "ところ", en: "when I did X, (a result followed)" },
    explanation:
      "With too many programs running, memory is short and the system spends its time swapping pages in and out instead of computing: thrashing. Overlay loads parts of a program in turn, compaction defragments memory, and roll-out swaps a whole process out.",
    ownKey: "イ",
  },
  {
    id: "r8-q09",
    topic: "Technology",
    stem: "{2要素認証|にようそにんしょう|two-factor authentication}に{該当|がいとう|fall under}する{組み|くみ|combination}はどれか。",
    choices: [
      "{クライアント証明書|クライアントしょうめいしょ|client certificate}，{ハードウェアトークン||hardware token}",
      "{静脈認証|じょうみゃくにんしょう|vein authentication (biometric)}，{指紋認証|しもんにんしょう|fingerprint authentication (biometric)}",
      "{パスワード認証|パスワードにんしょう|password authentication}，静脈認証",
      "パスワード認証，{秘密の質問の答え|ひみつのしつもんのこたえ|answer to a security question}",
    ],
    stemEn: "Which combination counts as two-factor authentication?",
    choicesEn: [
      "Client certificate, hardware token",
      "Vein authentication, fingerprint authentication",
      "Password authentication, vein authentication",
      "Password authentication, answer to a secret question",
    ],
    terms: [
      { ja: "2要素認証", en: "two-factor authentication" },
      { ja: "静脈認証", en: "vein authentication" },
      { ja: "秘密の質問", en: "security question" },
      { ja: "クライアント証明書", en: "client certificate" },
    ],
    pattern: { ja: "に該当する", en: "falls under / corresponds to" },
    explanation:
      "The two factors must come from different categories: something you know, something you have, something you are. A password is knowledge and a vein pattern is a biometric. The other choices pair two of the same kind: two possessions, two biometrics, two kinds of knowledge.",
    ownKey: "ウ",
  },
  {
    id: "r6-q14",
    topic: "Management",
    stem: "システムの{開発部門|かいはつぶもん|development department}と{運用部門|うんようぶもん|operations department}が{別々|べつべつ|separately}に{組織化|そしきか|organized}されているとき，システム開発を{伴う|ともなう|involving}{新規|しんき|new}サービスの{設計|せっけい|design}{及び|および|and}{移行|いこう|transition}を{円滑|えんかつ|smoothly}かつ{効果的|こうかてき|effectively}に{進める|すすめる|advance}ための{方法|ほうほう|method}のうち，{適切|てきせつ|appropriate}なものはどれか。",
    choices: [
      "{運用テスト|うんようテスト|operational test}の{完了後|かんりょうご|after completion}に，開発部門がシステム{仕様|しよう|specification}と運用方法を運用部門に{説明|せつめい|explain}する。",
      "運用テストは，開発部門の{支援|しえん|support}を{受けずに|うけずに|without receiving}，運用部門だけで{実施|じっし|carry out}する。",
      "運用部門からもシステムの運用に{関わる|かかわる|related to}{要件|ようけん|requirements}の{抽出|ちゅうしゅつ|elicitation}に{積極的に|せっきょくてきに|actively}{参加|さんか|take part}する。",
      "開発部門は運用テストを実施して，{運用マニュアル||operations manual}を{作成|さくせい|create}し，運用部門に{引き渡す|ひきわたす|hand over}。",
    ],
    stemEn:
      "When development and operations are organized as separate departments, which is an appropriate way to design and transition a new service that involves system development smoothly and effectively?",
    choicesEn: [
      "After the operational test is complete, development explains the system specification and operating method to operations.",
      "Operations carries out the operational test alone, without support from development.",
      "Operations also takes an active part in extracting the requirements related to operating the system.",
      "Development carries out the operational test, writes the operations manual and hands it over to operations.",
    ],
    terms: [
      { ja: "運用部門", en: "operations department" },
      { ja: "要件", en: "requirements" },
      { ja: "移行", en: "transition (into operation)" },
      { ja: "運用テスト", en: "operational test" },
    ],
    pattern: { ja: "を伴う", en: "accompanied by / involving" },
    explanation:
      "Operations should be involved from the requirements stage, so operability is designed in rather than discovered at handover. Explaining after the fact, or testing in separate silos, finds the problems late.",
    ownKey: "ウ",
  },
  {
    id: "r8-q12",
    topic: "Management",
    stem: "{バーンダウンチャート||burndown chart}の{使い方|つかいかた|how to use}として，{適切|てきせつ|appropriate}なものはどれか。",
    choices: [
      "{縦軸|たてじく|vertical axis}を{完成した成果物|かんせいしたせいかぶつ|completed deliverables}の{総量|そうりょう|total amount}，{横軸|よこじく|horizontal axis}を{時間|じかん|time}とし，プロジェクトが{進むに従って|すすむにしたがって|as it progresses}完成した成果物の総量が{増加|ぞうか|increase}する{様子|ようす|how it looks}を{確認|かくにん|check}する。",
      "縦軸を{残課題|ざんかだい|remaining issues}の{総数|そうすう|total number}，横軸を時間とし，プロジェクトが進むに従って残課題の{総量|そうりょう|total amount}が{増減|ぞうげん|rise and fall}する様子を確認する。",
      "縦軸を{残作業|ざんさぎょう|remaining work}の{量|りょう|amount}，横軸を時間とし，プロジェクトが進むに従って残作業の量が{減少|げんしょう|decrease}する様子を確認する。",
      "縦軸を{延べ工数|のべこうすう|cumulative effort (person-days)}，横軸を時間とし，プロジェクトが進むに従って延べ工数が増加する様子を確認する。",
    ],
    stemEn: "Which is an appropriate way to use a burndown chart?",
    choicesEn: [
      "Put the total amount of completed deliverables on the vertical axis and time on the horizontal axis, and watch the completed total grow as the project progresses.",
      "Put the total number of remaining issues on the vertical axis and time on the horizontal axis, and watch the remaining total rise and fall as the project progresses.",
      "Put the amount of remaining work on the vertical axis and time on the horizontal axis, and watch the remaining work shrink as the project progresses.",
      "Put the cumulative effort on the vertical axis and time on the horizontal axis, and watch the cumulative effort grow as the project progresses.",
    ],
    terms: [
      { ja: "バーンダウンチャート", en: "burndown chart" },
      { ja: "残作業", en: "remaining work" },
      { ja: "縦軸", en: "vertical axis" },
      { ja: "延べ工数", en: "cumulative effort" },
    ],
    pattern: { ja: "として，適切なものはどれか", en: "as X, which is appropriate?" },
    explanation:
      "A burndown chart plots remaining work against time, and the line falls toward zero. The choices with growing totals describe a burn-up style chart, and a count of open issues that rises and falls is not a burndown.",
    ownKey: "ウ",
  },
  {
    id: "r8-q13",
    topic: "Management",
    stem: "あるシステム開発プロジェクトの{進捗|しんちょく|progress}が{遅延|ちえん|delayed}したので，{クリティカルパス||critical path}{上|じょう|on}の{作業|さぎょう|task}への{投入工数|とうにゅうこうすう|effort assigned}を{増やす|ふやす|increase}{ことによって|ことによって|by doing}{遅延の解消|ちえんのかいしょう|eliminating the delay}を{図った|はかった|attempted}。このとき{適用|てきよう|apply}した，{所要期間|しょようきかん|required duration}を{短縮|たんしゅく|shorten}するための{手法|しゅほう|technique}を{何と呼ぶか|なんとよぶか|what is it called?}。",
    choices: [
      "{クラッシング||crashing (add resources to shorten the schedule)}",
      "{コーチング||coaching}",
      "{ファストトラッキング||fast tracking (overlap tasks)}",
      "{メンタリング||mentoring}",
    ],
    stemEn:
      "A system development project fell behind, so the delay was tackled by increasing the effort put into tasks on the critical path. What is this technique for shortening the required duration called?",
    choicesEn: ["Crashing", "Coaching", "Fast tracking", "Mentoring"],
    terms: [
      { ja: "クリティカルパス", en: "critical path" },
      { ja: "クラッシング", en: "crashing" },
      { ja: "ファストトラッキング", en: "fast tracking" },
      { ja: "投入工数", en: "effort put in" },
    ],
    pattern: { ja: "ことによって", en: "by doing X" },
    explanation:
      "Crashing adds resources to critical-path tasks to shorten the schedule, at higher cost. Fast tracking instead overlaps tasks that were planned in sequence, at higher risk. Coaching and mentoring are about developing people.",
    ownKey: "ア",
  },
  {
    id: "r8-q15",
    topic: "Management",
    stem: "{内部監査部門|ないぶかんさぶもん|internal audit department}が，{情報システム部門|じょうほうシステムぶもん|IT department}に{対する|たいする|aimed at}{システム監査|システムかんさ|system audit}を{経営者|けいえいしゃ|management}から{指示|しじ|instruct}されたとき，{システム監査人|システムかんさにん|system auditor}の{行為|こうい|conduct}として，適切なものはどれか。",
    choices: [
      "{監査報告書|かんさほうこくしょ|audit report}に{記載|きさい|write}した{改善提案|かいぜんていあん|improvement proposal}に対して{改善計画|かいぜんけいかく|improvement plan}を{策定|さくてい|draw up}した{上で|うえで|and then}，{実行|じっこう|carry out}する。",
      "{基幹システム|きかんシステム|core system}を{開発|かいはつ|develop}し，{保守|ほしゅ|maintain}を{行っている|おこなっている|is doing}{外部事業者|がいぶじぎょうしゃ|external vendor}に，{当該|とうがい|the relevant}システム監査を{委託|いたく|outsource}する。",
      "経営者がどのような{ニーズ||needs}を{有している|ゆうしている|has}かを{十分|じゅうぶん|sufficiently}に{把握|はあく|grasp}した上で，システム監査の{目的|もくてき|purpose}と{対象範囲|たいしょうはんい|scope}を{決定|けってい|decide}する。",
      "情報システム部門の{在籍者|ざいせきしゃ|member of the department}を{監査メンバ|かんさメンバ|audit team member}として{選定|せんてい|select}する。",
    ],
    stemEn:
      "When an internal audit department is instructed by management to audit the IT department, which is an appropriate action for the system auditor?",
    choicesEn: [
      "Draw up an improvement plan for the improvement proposals written in the audit report, and then carry it out.",
      "Outsource that system audit to the external vendor that developed and maintains the core system.",
      "Decide the purpose and scope of the system audit after fully grasping what needs management has.",
      "Select members of the IT department as audit team members.",
    ],
    terms: [
      { ja: "システム監査人", en: "system auditor" },
      { ja: "監査報告書", en: "audit report" },
      { ja: "対象範囲", en: "scope" },
      { ja: "当該", en: "the said, the relevant" },
    ],
    pattern: { ja: "上で", en: "after having done X, and then" },
    explanation:
      "An auditor must be independent of what is audited. So the auditor does not carry out the improvements it proposes, does not hand the audit to the vendor that built the system, and does not staff the team from the audited department. Starting from management's needs to fix purpose and scope is the correct move.",
    ownKey: "ウ",
  },
  {
    id: "r7-q16",
    topic: "Strategy",
    stem: "{データマイニング||data mining}の{手法|しゅほう|method}の{一つ|ひとつ|one of}であって，{POS||point-of-sale (cash register) data}などの{蓄積|ちくせき|accumulated}データから“{一緒|いっしょ|together}に{買われる|かわれる|bought}{商品|しょうひん|products}”の{組合せ|くみあわせ|combination}を{発見|はっけん|discover}する{分析手法|ぶんせきしゅほう|analysis method}はどれか。",
    choices: [
      "{3C分析|スリーシーぶんせき|3C analysis}",
      "{ABC分析|エービーシーぶんせき|ABC (Pareto) analysis}",
      "{コンジョイント分析|コンジョイントぶんせき|conjoint analysis}",
      "{マーケットバスケット分析|マーケットバスケットぶんせき|market basket analysis}",
    ],
    stemEn:
      "Which analysis method, one of the data mining techniques, discovers combinations of 'products bought together' from accumulated data such as POS data?",
    choicesEn: ["3C analysis", "ABC analysis", "Conjoint analysis", "Market basket analysis"],
    terms: [
      { ja: "マーケットバスケット分析", en: "market basket analysis" },
      { ja: "ABC分析", en: "ABC (Pareto) analysis" },
      { ja: "3C分析", en: "3C analysis" },
      { ja: "コンジョイント分析", en: "conjoint analysis" },
    ],
    pattern: { ja: "であって", en: "which is X and also..." },
    explanation:
      "Market basket analysis finds items that appear together in the same purchase. ABC analysis ranks items by contribution, 3C analysis is a strategy framework (customer, competitor, company), and conjoint analysis estimates how customers value product attributes.",
    ownKey: "エ",
  },
  {
    id: "r7-q17",
    topic: "Strategy",
    stem: "{インターネット上|インターネットじょう|on the Internet}の{生成AI|せいせいエーアイ|generative AI}サービスを{利用する際|りようするさい|when using}に，{オプトアウト||opt-out}を{設定する|せっていする|set}ことはどのような{場合|ばあい|case}に{有効|ゆうこう|effective}か。",
    choices: [
      "{個々|ここ|each, individual}の{利用者|りようしゃ|user}が，{自身|じしん|oneself}が生成AIから{得た|えた|obtained}{情報|じょうほう|information}に対して，{著作権|ちょさくけん|copyright}を{主張|しゅちょう|claim}したい場合",
      "個々の利用者が{入力|にゅうりょく|input}した情報を，生成AIの{学習|がくしゅう|training}に{利用させたくない|りようさせたくない|do not want to be used}場合",
      "個々の利用者が入力した情報を，生成AIを{通じて|つうじて|through}，{他の|ほかの|other}利用者にも{知ってほしい|しってほしい|want (them) to know}場合",
      "生成AIから得た情報の{信ぴょう性|しんぴょうせい|credibility}を{高めたい|たかめたい|want to raise}場合",
    ],
    stemEn: "When using an online generative AI service, in what case is it effective to set an opt-out?",
    choicesEn: [
      "When an individual user wants to claim copyright over information they obtained from the generative AI.",
      "When an individual user does not want the information they entered to be used for training the generative AI.",
      "When an individual user wants other users to also know, through the generative AI, the information they entered.",
      "When you want to raise the credibility of information obtained from the generative AI.",
    ],
    terms: [
      { ja: "オプトアウト", en: "opt-out" },
      { ja: "生成AI", en: "generative AI" },
      { ja: "著作権", en: "copyright" },
      { ja: "信ぴょう性", en: "credibility" },
    ],
    pattern: { ja: "際に", en: "when, on the occasion of" },
    explanation:
      "Opting out means declining a use that is on by default. Here it means refusing to let your prompts be used as training data. It does nothing for copyright claims, sharing with other users or the reliability of answers.",
    ownKey: "イ",
  },
  {
    id: "r7-q18",
    topic: "Strategy",
    stem: "{物販事業|ぶっぱんじぎょう|retail business selling goods}において，{ロングテール||long tail}をビジネスとして{成功|せいこう|succeed}させるために{必要|ひつよう|necessary}な{施策|しさく|measure}はどれか。",
    choices: [
      "{多く|おおく|many}の{有名|ゆうめい|famous}ブランド店が{出店|しゅってん|open a store}する{ショッピングモール||shopping mall}の{構築|こうちく|build}",
      "{交通|こうつう|transport}の{利便性|りべんせい|convenience}が{高い|たかい|high}{地域|ちいき|area}に{対する|たいする|aimed at}，{生活必需品|せいかつひつじゅひん|daily necessities}を{広く浅く|ひろくあさく|broad but shallow}{取りそろえた|とりそろえた|stocked}{出店計画|しゅってんけいかく|store opening plan}",
      "{店舗|てんぽ|store}で{購入|こうにゅう|buy}した商品を{近隣地域|きんりんちいき|neighboring area}に{無償|むしょう|free of charge}で{配送|はいそう|deliver}するサービスの{実施|じっし|implement}",
      "{豊富|ほうふ|abundant}な{品ぞろえ|しなぞろえ|product range}と，{在庫コスト|ざいこコスト|inventory cost}や{配送費用|はいそうひよう|delivery cost}を{抑える|おさえる|keep down}ための{大規模|だいきぼ|large-scale}な{物流センタ|ぶつりゅうセンタ|logistics center}の構築や{活用|かつよう|use}",
    ],
    stemEn: "In a retail business selling goods, which measure is needed to make the long tail succeed as a business?",
    choicesEn: [
      "Building a shopping mall where many famous brand stores open.",
      "A store opening plan for areas with good transport access, stocking daily necessities broadly but shallowly.",
      "A service delivering goods bought in the store free of charge to the neighboring area.",
      "An abundant product range, together with building and using a large logistics center to keep inventory and delivery costs down.",
    ],
    terms: [
      { ja: "ロングテール", en: "long tail" },
      { ja: "品ぞろえ", en: "product range" },
      { ja: "在庫コスト", en: "inventory cost" },
      { ja: "物流センタ", en: "logistics center" },
    ],
    pattern: { ja: "ために必要な", en: "necessary in order to..." },
    explanation:
      "The long tail is the idea that many low-volume items add up to substantial sales. It only works if you can offer a very wide range while keeping stock and shipping cheap, which is what a large logistics center does.",
    ownKey: "エ",
  },
  {
    id: "r6-q20",
    topic: "Strategy",
    stem: "{日本|にほん|Japan}において，{産業財産権|さんぎょうざいさんけん|industrial property rights}と{総称|そうしょう|collectively called}される{四つ|よっつ|four}の{権利|けんり|rights}はどれか。",
    choices: [
      "{意匠権|いしょうけん|design right}，{実用新案権|じつようしんあんけん|utility model right}，{商標権|しょうひょうけん|trademark right}，{特許権|とっきょけん|patent right}",
      "意匠権，実用新案権，{著作権|ちょさくけん|copyright}，特許権",
      "意匠権，商標権，著作権，特許権",
      "実用新案権，商標権，著作権，特許権",
    ],
    stemEn: "In Japan, which are the four rights collectively called industrial property rights?",
    choicesEn: [
      "Design right, utility model right, trademark right, patent right",
      "Design right, utility model right, copyright, patent right",
      "Design right, trademark right, copyright, patent right",
      "Utility model right, trademark right, copyright, patent right",
    ],
    terms: [
      { ja: "産業財産権", en: "industrial property rights" },
      { ja: "特許権", en: "patent right" },
      { ja: "意匠権", en: "design right" },
      { ja: "著作権", en: "copyright" },
    ],
    pattern: { ja: "と総称される", en: "collectively called" },
    explanation:
      "The four are patent, utility model, design and trademark rights, all registered with the Japan Patent Office. Copyright is not among them: it arises on creation, with no registration.",
    ownKey: "ア",
  },
  {
    id: "r8-q20",
    topic: "Strategy",
    stem: "{A社|エーしゃ|Company A}は，{自社|じしゃ|its own company}の{業務可視化|ぎょうむかしか|visualization of business processes}を{B社|ビーしゃ|Company B}に{委託|いたく|outsource}しその{成果物|せいかぶつ|deliverable}として{納品|のうひん|delivered}された{業務フロー図|ぎょうむフローず|business flow diagram}を{C社|シーしゃ|Company C}に{提示|ていじ|present}することによって，{業務システム|ぎょうむシステム|business system}の開発をC社に委託することを{検討|けんとう|consider}している。A社がこの業務フロー図を{使用する上で|しようするうえで|in using}{生じる|しょうじる|arise}{制約|せいやく|restriction}として，適切なものはどれか。なお，B社への委託に{当たって|あたって|upon}{締結|ていけつ|conclude}された{契約|けいやく|contract}には，{著作権|ちょさくけん|copyright}は{全て|すべて|all}A社に{譲渡|じょうと|transfer}する{旨の|むねの|to the effect that}記述があり，{著作者人格権|ちょさくしゃじんかくけん|moral rights of the author}については{特段|とくだん|particular}の記述はない。",
    choices: [
      "C社と{守秘義務契約|しゅひぎむけいやく|non-disclosure agreement}を締結したとしても，C社に対して，納品された業務フロー図の{電子データ|でんしデータ|electronic data}を{提供|ていきょう|provide}することはできない。",
      "納品された業務フロー図の{各ページ|かくページ|each page}に{作成者名|さくせいしゃめい|author's name}として{記されている|しるされている|is written}B社の{企業名|きぎょうめい|company name}をA社の企業名に{変更|へんこう|change}し，C社に提示することはできない。",
      "納品された業務フロー図を{印刷|いんさつ|print}し，{社内資料|しゃないしりょう|internal document}としてA社の{社員|しゃいん|employee}に{配布|はいふ|distribute}することはできない。",
      "{バックアップ||backup}の目的で，納品された業務フロー図の電子データを{複製|ふくせい|copy}し，A社だけがアクセス可能な{クラウドストレージ||cloud storage}に{保管|ほかん|store}することはできない。",
    ],
    stemEn:
      "Company A outsourced the visualization of its business processes to Company B, and is considering presenting the business flow diagram delivered as the result to Company C to outsource development of a business system to C. Which is an appropriate restriction on A's use of this diagram? The contract with B says all copyright is transferred to A, and says nothing in particular about moral rights of the author.",
    choicesEn: [
      "Even with a non-disclosure agreement with C, A cannot give C the electronic data of the delivered diagram.",
      "A cannot change the name of Company B, written on each page as the author, to A's name and present it to C.",
      "A cannot print the delivered diagram and distribute it to A's employees as an internal document.",
      "A cannot copy the electronic data of the delivered diagram for backup and store it in cloud storage that only A can access.",
    ],
    terms: [
      { ja: "著作者人格権", en: "moral rights of the author (cannot be transferred)" },
      { ja: "譲渡", en: "transfer (assignment)" },
      { ja: "守秘義務契約", en: "non-disclosure agreement (NDA)" },
      { ja: "複製", en: "reproduction, copying" },
    ],
    pattern: { ja: "旨の", en: "to the effect that" },
    explanation:
      "Copyright, meaning the economic rights, was transferred to A, so A may copy, print and hand the data to C. Moral rights of the author cannot be transferred, and the contract is silent, so B keeps them, including the right to have its name shown. Replacing B's name with A's is therefore the one thing A cannot do.",
    ownKey: "イ",
  },
]
