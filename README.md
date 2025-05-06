# 📚 DocShelf - Web開発者向けリファレンス&Tips管理アプリ

DocShelf は、React・Tailwind CSS・Supabase などの Web 開発に関する知識や Tips を
「カテゴリごとに整理・管理・投稿」できる学習支援アプリです。

本アプリは、面接時の技術アピール用ポートフォリオとして制作しました。
また、開発の動機としては、現在使用している Notion よりも高速に動作し、
自分好みにUI/UXをカスタマイズできるツールが欲しかったことが背景にあります。

---

## 🧩 特徴

- 📌 **カテゴリ別Tips管理**：React、Supabase、Tailwind CSS などのカテゴリに分類して Tips を一覧・投稿・編集・削除できます。
- ✅ **Supabase認証**：メールアドレス＋パスワードでログインし、自分だけの Tips を管理。
- ✨ **モダンUI**：Tailwind CSS + ShadCN UI によるシンプルで見やすいデザイン。
- 🔄 **リアルタイムデータ連携**：Supabaseのデータベースと双方向通信。
- 🧠 **RLS対応設計**：自分の投稿のみ編集・削除が可能。

---

## 🔐 テスト用ログイン情報（面接官向け）

- メールアドレス: `test@example.com`  
- パスワード: `testtest`
※ 認証が必要な機能を確認する際にご利用ください。

---

## 🛠 使用技術スタック

| 項目            | 使用技術                          |
|-----------------|-----------------------------------|
| フロントエンド   | React, TypeScript, Vite           |
| UI ライブラリ   | Tailwind CSS, ShadCN UI           |
| 認証・DB        | Supabase (Auth + Postgres)        |
| 状態管理        | useState / useEffect（簡易構成）  |
| ルーティング     | React Router DOM                  |
| デプロイ        | Vercel                            |

---

## 📂 ディレクトリ構成（簡略）
<!-- <details> -->
<!-- <summary>展開して表示</summary> -->

```plaintext

src/
├── api/         # Supabaseとのやり取り（fetch系関数など）
├── assets/      # ロゴや画像などの静的アセット
├── components/  # UIコンポーネント（NavCard, LogoutButtonなど）
│   └── ui/      # ShadCN UIなどの再利用可能なUI部品
├── lib/         # supabaseClientなどのライブラリ設定
├── pages/       # 各ページコンポーネント（Home, Tips, Post, Category別など）
│   └── category/  # カテゴリごとの動的ルーティングページ
└── types/       # TypeScriptによる型定義（例：Tip型）

```
## 機能一覧
- カテゴリ一覧を Supabase から動的取得して表示

- Tipsの投稿・編集・削除（認証済みユーザーのみ）

- Supabase Auth によるログイン・ログアウト機能

- /category/[href] によるカテゴリ別ルーティング・表示

- RLS対応：自分以外のユーザーのデータ操作不可

## 今後の追加予定機能
- 検索機能（タイトル・キーワードからの絞り込み）

- 投稿されたTipsの可視化（棒グラフ・円グラフなど）

- 投稿内容のMarkdownサポート

- コメント機能（Tipsへの補足・議論）

## 補足事項
-.env ファイルの漏洩対策として .gitignore に登録済み

-認証付き投稿管理（RLS）により他ユーザーのデータ編集・削除は不可





