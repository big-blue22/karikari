# GitHub Pages 設定ガイド

## エラーの原因
「Get Pages site failed」エラーは、リポジトリでGitHub Pagesが正しく設定されていないことが原因です。

## 解決手順

### 1. GitHubリポジトリでの設定
1. GitHubでリポジトリを開く
2. **Settings**タブをクリック
3. 左サイドバーから**Pages**を選択
4. **Source**を**GitHub Actions**に変更
   - 「Deploy from a branch」ではなく「GitHub Actions」を選択
5. 設定を保存

### 2. リポジトリの権限確認
- リポジトリがパブリックであることを確認
- プライベートリポジトリの場合、GitHub Pro以上のプランが必要

### 3. 変更をプッシュ
```bash
git add .
git commit -m "GitHub Pages設定を更新"
git push origin main
```

### 4. デプロイの確認
- GitHubの**Actions**タブで実行状況を確認
- エラーがある場合はログを確認

## 手動デプロイの方法
GitHub Actionsが使えない場合：
```bash
npm run deploy
```

## サイトURL
設定完了後、サイトは以下のURLで利用可能：
`https://[ユーザー名].github.io/minecraft-helper/`

## トラブルシューティング
- Actionsタブでワークフローエラーを確認
- リポジトリ名がvite.config.tsのbaseパスと一致しているか確認
- mainブランチが存在し、コードが含まれているか確認
