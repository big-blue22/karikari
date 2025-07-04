# マイクラ コマンドの書 - Minecraft Helper

Minecraftのコマンドとキーボード操作を学習できるWebアプリケーションです。

## 🎮 機能

- **キーボードレイアウト**: Minecraftの基本的なキーボード操作を学習
- **コマンド一覧**: 便利なMinecraftコマンドの検索・閲覧

## 🚀 ローカル開発

**前提条件:** Node.js

1. 依存関係をインストール:
   ```bash
   npm install
   ```

2. 環境変数を設定:
   `.env.local`ファイルに`GEMINI_API_KEY`を設定してください

3. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

## 📦 ビルド

```bash
npm run build
```

## 🌐 GitHub Pagesデプロイ

このプロジェクトはGitHub Actionsを使用してGitHub Pagesに自動デプロイされます。

### デプロイ手順

1. **リポジトリ設定**:
   - GitHubリポジトリの`Settings` > `Pages`に移動
   - Source を `GitHub Actions` に設定

2. **自動デプロイ**:
   - `main`ブランチにプッシュすると自動的にデプロイされます
   - GitHub Actionsワークフローが自動実行されます

3. **手動デプロイ** (オプション):
   ```bash
   npm run deploy
   ```

### トラブルシューティング

- **表示されない場合**: リポジトリ名が`minecraft-helper`と一致していることを確認
- **404エラー**: GitHub PagesのSourceが`GitHub Actions`に設定されていることを確認
- **ビルドエラー**: ローカルで`npm run build`が成功することを確認

## 🛠 技術スタック

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GitHub Actions
