# GitHub Pages Setup Instructions

To fix the "HttpError: Not Found" and "Get Pages site failed" errors, you need to configure GitHub Pages for your repository:

## Steps to Enable GitHub Pages:

1. **Go to your GitHub repository** (https://github.com/[your-username]/minecraft-helper)

2. **Navigate to Settings**:
   - Click on the "Settings" tab in your repository

3. **Configure Pages**:
   - Scroll down to the "Pages" section in the left sidebar
   - Click on "Pages"

4. **Set Source to GitHub Actions**:
   - Under "Source", select "GitHub Actions" (not "Deploy from a branch")
   - This tells GitHub to use the workflow file we have (`.github/workflows/deploy.yml`)

5. **Save the configuration**

6. **Push your changes** (if you haven't already):
   ```bash
   git add .
   git commit -m "Update Node.js version in workflow"
   git push origin main
   ```

7. **Trigger the workflow**:
   - The workflow should automatically run when you push to the main branch
   - You can also manually trigger it from the "Actions" tab

## Alternative: Manual Deployment

If you prefer to deploy manually using the gh-pages package:

```bash
npm run deploy
```

This will build the project and deploy it to the gh-pages branch.

## Troubleshooting

- Make sure your repository is public (or you have GitHub Pro for private repo Pages)
- Ensure the main branch exists and has your code
- Check the Actions tab for any workflow errors
- Verify that the repository name matches the base path in vite.config.ts

Your site will be available at: `https://[your-username].github.io/minecraft-helper/`
