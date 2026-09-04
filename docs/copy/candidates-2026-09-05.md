# 日本語コピー候補(2026-09-05、音読待ち)

パイプライン(draft→lint→critique→revise→judge、Gemini 3.8 Flash + GPT-5.5 judge)の勝者。事実シートは `scripts/copy-pipeline/facts/`、判定の残課題は各節末尾。適用は `bun run copy:apply <ns> --lang ja --variant <n>` の後に `bun run check:messages`。**適用前に一度声に出して読む(Pass 4)**。ファクトチェックの直し(`fact-check-2026-09-05.md`)は候補に反映済みか、各節の注記で示す。

## home — 勝者「人柄」(variant 2)

採点: nativeness 5 / voiceFit 5 / factFidelity 5

- `hero.title`: 東京でWebサービスを作っているフリーランスエンジニアです。
- `hero.description`: エンジニアとして9年以上開発を続けています。スタートアップのWeb・モバイルアプリを中心に、フロントエンドからバックエンド、AWSのインフラ周りまで手を動かしてきました。現在はコーディングAIの出力レビューや設計の相談に乗る仕事も増えています。やりとりは日本語、英語、ロシア語に対応しています。
- `hero.seeMyWork`: 作ったものを見る
- `hero.getInTouch`: 連絡する
- `services.heading`: やっていること
- `services.development.title`: プロダクト開発
- `services.development.description`: ReactやNext.js、Ruby on Railsなどを使って、Webサービスの立ち上げや機能改修を行っています。AIによるコード生成を前提とした設計やレビューにも対応しています。
- `services.ai.title`: LLMの組み込み・評価基盤
- `services.ai.description`: LLMを実際のプロダクトで安定して動かすための仕組みを作ってきました。直近では国内の医療系SaaSで、プロンプトのA/BテストやCIでの自動評価パイプラインを構築しました。
- `services.localization.title`: 多言語化と日本向けローカライズ
- `services.localization.description`: サービスの多言語対応（i18n）や日本市場に合わせた実装を担当します。日本語や英語でのチーム開発、仕様調整にも対応しています。
- `recentPosts.heading`: ブログ記事
- `recentPosts.allPosts`: すべての記事
- `cta.heading`: お気軽にご相談ください
- `cta.description`: 新規サービスの開発、LLMの組み込み、コードレビューの依頼など、困っていることがあればフォームからご連絡ください。
- `cta.getInTouch`: メッセージを送る

残課題(judge):
- 「作ったものを見る」は個人開発感が強く、仕事の実績CTAならCURRENTの「実績を見る」の方が無難です。
- 「お気軽にご相談ください」はよくある営業文句で、声の個性は弱いです。もう少し具体的にした方がよいです。
- 「ローカライズ」は問題ありませんが、ファクトシート上は i18n と日本市場向け実装が中心なので、翻訳・文言調整まで広く請けるように読ませすぎない方が安全です。
- 「コーディングAI」は少し口語的で、人によっては曖昧です。「AIエージェントが生成したコード」くらいの方が具体的です。

## about — 勝者「人柄」(variant 2)

採点: nativeness 5 / voiceFit 5 / factFidelity 5

- `metadata.title`: ニキータについて | ソフトウェアエンジニア
- `metadata.description`: ロシア出身、日本でキャリアを積んできたフリーランスエンジニアです。Webやバックエンド、インフラの構築から本番運用のAIシステムまで担当しています。
- `name`: ニキータ
- `tagline`: 東京でWebサービスやアプリを作っているフリーランスエンジニアです。
- `story.p1`: ロシア出身で、言葉や歴史、異なる文化のつながりに関心を持ったことから神戸の外国語大学に進学しました。卒業後は一貫して日本のプロダクトチームでエンジニアとしてのキャリアを重ね、現在は東京でフリーランスをしています。
- `story.p2`: 開発歴は9年以上になります。TypeScript/ReactやRuby on Rails、AWSを中心に、Webフロントエンドからバックエンド、インフラまで全体を巻き取って作業することが多いです。大がかりな会議やプロセスをなぞるより、動くものを早く出して改善していくやり方を好みます。
- `story.p3`: 新規事業の立ち上げや、既存のRails・インフラ環境の刷新を多く経験してきました。最近は本番で安定して動くLLMパイプラインの設計や評価環境の構築、8人規模のチームへのAIツール導入支援などに注力しています。
- `story.p4_pre`: 直近まで医療系AI SaaSの開発を主導していたほか、個人開発として日本人向けの韓国語読解アプリを開発中です。AI開発の実践やシステムの信頼性検証については
- `story.p4_link`: ブログ記事
- `story.p4_post`: に書いています。
- `story.p5_pre`: 開発のヘルプや技術的な壁打ちなど、何かあれば
- `story.p5_link`: こちらからご連絡
- `story.p5_post`: いただければと思います。
- `tech.heading`: 扱っている技術
- `languages.heading`: 使える言語
- `languages.russian`: ロシア語
- `languages.russianLevel`: 母語
- `languages.english`: 英語
- `languages.englishLevel`: 流暢
- `languages.japanese`: 日本語
- `languages.japaneseLevel`: 流暢

残課題(judge):
- 「大がかりな会議やプロセスをなぞる」は少し不自然で、攻撃的にも見える。CURRENT寄りに「形式的なプロセスより、動くものを出して改善することを大事にしています」くらいがよい。
- 「AIツール導入支援」は少し営業コピー寄り。Fact sheetでは“led adoption”なので、「8人規模のチームでAIコーディングツールの導入を進めた」くらいの方が具体的。
- 「ブログ記事に書いています」は公開済み記事が限定的なら安全だが、複数テーマを広く書いているようには見せすぎない方がよい。
- Kanyomiの名前を出した方が、個人開発の具体性が上がる。
- 現在の働き方として複数クライアントを持っている事実は、入れるなら「複数のクライアントの開発に携わっています」程度が安全。

## services — 勝者「人柄」(variant 2)

採点: nativeness 4.5 / voiceFit 4.6 / factFidelity 4.4

- `metadata.title`: サービス — ソフトウェア開発、AI導入、多言語化
- `metadata.description`: 東京在住のフリーランスエンジニアです。Webアプリ開発から実務で使うAIの導入、日英露のローカライズまで直接お受けしています。
- `heading`: できること
- `description`: 東京を拠点に、Web開発からインフラ、AIの実運用、日英露の3言語対応まで、仲介会社を挟まず直接お受けしています。
- `whoThisIsFor`: こんなチームに向いています: {who}
- `development.title`: ソフトウェア開発
- `development.items[0]`: Next.js / ReactとTypeScriptでのWebフロントエンド開発
- `development.items[1]`: プロダクトの要件に応じたモバイル開発（React Native / SwiftUI）
- `development.items[2]`: Rails、GraphQL、PostgreSQLを使ったバックエンド実装
- `development.items[3]`: AWS・Terraformでの環境構築や、モノリス分割・移行などの既存改善
- `development.who`: フロントからインフラまでひとりで面倒を見られるエンジニアに入ってほしいチーム。
- `ai.title`: AIの実運用への組み込み
- `ai.items[0]`: 既存サービスへのLLM機能の追加と運用
- `ai.items[1]`: 実務で本当に時間を削減できる作業のAI自動化
- `ai.items[2]`: LLM-as-judgeなどの評価環境やハルシネーションの監視
- `ai.items[3]`: 開発チームへのAIコーディングツール導入とデリバリー改善
- `ai.who`: デモやスライドだけで終わらせず、実際の業務の中でAIを動かしたい企業。
- `localization.title`: ローカライズと多言語設計
- `localization.items[0]`: 日英露に対応したソフトウェア翻訳と調整
- `localization.items[1]`: 言葉の置き換えだけでなく、対象市場に合わせたUXの見直し
- `localization.items[2]`: 多言語対応（i18n）を見据えたアーキテクチャ設計・実装
- `localization.items[3]`: 言語ごとの表示崩れや文化差を考慮したUI設計
- `localization.who`: 日本市場に参入したいプロダクトや、英語圏・ロシア語圏へ展開したい日本のチーム。
- `cta.heading`: 取り組んでいるプロジェクトについて、まずは聞かせてください。
- `cta.getInTouch`: 問い合わせる
- `cta.readBlog`: 日本でのフリーランス生活や仕事のブログ

残課題(judge):
- 「デリバリー改善」は少しコンサル/外資っぽいので、「開発の進み方を速くする」などに寄せると自然です。
- 「AIの実運用への組み込み」は意味は通りますが少し重いです。「AIを実務に組み込む」くらいの方が自然です。
- 「日英露」は短くて便利ですが、人によっては硬く見えるため、本文では一度「日本語・英語・ロシア語」と書いた方が親切です。
- 全体としてまだ一人称が少ないため、冒頭だけでも「東京でフリーランスのソフトウェアエンジニアをしています」のようにすると本人感が出ます。
- サービスページとしては問題ありませんが、現行・候補ともに代理店向けが一部落ちています。必要なら対象に「代理店」も残した方がFact sheetに忠実です。

## projects — 勝者「人柄」(variant 2)

採点: nativeness 4.2 / voiceFit 4.1 / factFidelity 4.3

- `metadata.title`: プロジェクト — 作ってきたものと現在地
- `metadata.description`: 業務で携わったLLM基盤やインフラ構築、個人で進めている語学アプリなど、これまでの制作物と実績をまとめています。
- `heading`: プロジェクト
- `description`: 現在進めているものと、これまで作ってきたプロダクトの記録。
- `status.live`: 公開中
- `status.inProgress`: 開発中
- `status.planned`: 計画中
- `items.healthcareAi.title`: 医療・介護向けAIプラットフォーム
- `items.healthcareAi.description`: LLMによるケアマネジメント等の公的書類作成プロダクトです。生成結果の信頼性を担保する仕組みを中心に構築しました。固定ケースを用いたLLM-as-a-judge評価、トレースと紐づけたハルシネーション率の計測、プロンプトのA/B比較を無人で回せる再開可能な評価実行基盤などを実装しました。
- `items.agentOps.title`: エージェント駆動の開発プロセス
- `items.agentOps.description`: コードの品質改善やタスク消化、PR作成を自動で行うCIエージェントを導入しました。レビュー用エージェントによる自己承認を防ぐガードや、Sentryのエラーをリポジトリ横断で調査するSlackエージェントの実装などを担当しました。
- `items.kanyomi.title`: Kanyomi
- `items.kanyomi.description`: 日本語話者向けの韓国語多読学習プロダクトです。助詞や漢字語の対応を活かした読み物生成パイプラインをLLMで組んでいます。現在開発中で、アプリ自体は未公開です。
- `items.pechka.title`: Pechka
- `items.pechka.description`: 日本語話者向けに作ったロシア語学習アプリ。間隔反復と多読を組み合わせた構成で、実装自体は完了していますが、リリースは行わず未公開のままにしています。
- `items.nerixim.title`: nerixim.dev
- `items.nerixim.description`: このポートフォリオサイトです。Next.js（App Router）による静的生成で、日英露ウの4言語に対応させています。
- `items.freelance.title`: フリーランスでの受託開発
- `items.freelance.description`: 国内外のクライアントと組んでWebやモバイル、インフラの開発をしています。新規サービスの立ち上げから、RailsからNext.jsへのリプレイス、TerraformやAWS CDKによるインフラ構築などを担当しています。

残課題(judge):
- Kanyomiは「サービス」「プロダクト」「アプリ未公開」だと、実体があるが公開していないだけに読めます。事実に寄せるなら「アプリはまだなく、コンテンツ生成・QAパイプラインを作っています」くらいが安全です。
- Kanyomiの現状として「21本ドラフト済み、承認済みはまだなし」を載せるなら、より具体的でファクトシートにも忠実です。
- 各項目のステータス表示が実装側にあるなら、Kanyomi=開発中、nerixim.dev=公開中、Pechka=未公開または開発を一時停止、過去クライアントワーク=過去実績として扱う必要があります。公開中/開発中/計画中だけではPechkaと過去案件を正確に表しにくいです。
- 「日英露ウ」はやや不自然なので、「日本語・英語・ロシア語・ウクライナ語」または単に「4言語」の方が自然です。
- 「信頼性を担保」はビジネス文書っぽく、少しAI臭もあります。「生成結果を継続的に確認する仕組み」など、具体に寄せた方が声に合います。

