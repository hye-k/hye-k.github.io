# Obsidian Vault Setup Guide

## Step 1: Create Private Vault Repository

### 1.1 GitHub에서 Private Repository 생성

1. GitHub에 접속: https://github.com/new
2. Repository 정보 입력:
   - **Repository name**: `obsidian-blog-vault` (또는 원하는 이름)
   - **Visibility**: **Private** ⚠️ (매우 중요!)
   - **Initialize**: README 체크 안 함
3. "Create repository" 클릭

### 1.2 로컬에 Vault 생성

터미널에서 실행:

```bash
# Vault 디렉토리 생성 (원하는 위치에)
mkdir -p ~/obsidian-blog-vault
cd ~/obsidian-blog-vault

# Git 초기화
git init

# 폴더 구조 생성
mkdir -p drafts published assets/images

# .gitignore 생성
cat > .gitignore << 'EOF'
.DS_Store
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.trash/
EOF

# README 생성
cat > README.md << 'EOF'
# Blog Vault

This is a private Obsidian vault for blog content.

## Structure

- `drafts/` - Work-in-progress posts (private)
- `published/` - Posts ready for publication (will be synced to blog)
- `assets/` - Images and attachments

## Workflow

1. Write posts in `drafts/`
2. When ready, move to `published/`
3. Commit and push to trigger automatic deployment
EOF

# 초기 커밋
git add .
git commit -m "Initial vault structure"

# Remote 연결 (YOUR_USERNAME를 실제 GitHub username으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/obsidian-blog-vault.git
git branch -M main
git push -u origin main
```

### 1.3 Obsidian에서 Vault 열기

1. Obsidian 실행
2. "Open folder as vault" 클릭
3. `~/obsidian-blog-vault` 선택
4. Vault 설정:
   - Settings → Files & Links
   - "Default location for new attachments": `assets/images`
   - "Use [[Wikilinks]]": ON (Obsidian 링크 사용)

---

## Step 2: GitHub Personal Access Token 생성

GitHub Actions가 private vault에 접근하고 public blog repo에 push하려면 PAT가 필요합니다.

### 2.1 PAT 생성

1. GitHub Settings: https://github.com/settings/tokens/new
2. 설정:
   - **Note**: `Blog Vault Sync`
   - **Expiration**: 1 year (캘린더에 갱신 알림 설정 추천)
   - **Scopes**:
     - ✅ `repo` (전체 선택)
3. "Generate token" 클릭
4. **토큰 복사** (다시 볼 수 없으므로 안전한 곳에 임시 저장)

### 2.2 Blog Repository에 Secret 추가

1. Blog repo 설정: `https://github.com/YOUR_USERNAME/blog/settings/secrets/actions`
2. "New repository secret" 클릭
3. Secret 추가:
   - **Name**: `VAULT_SYNC_TOKEN`
   - **Secret**: (위에서 복사한 PAT 붙여넣기)
4. "Add secret" 클릭

### 2.3 Vault Repository에 Secret 추가

1. Vault repo 설정: `https://github.com/YOUR_USERNAME/obsidian-blog-vault/settings/secrets/actions`
2. "New repository secret" 클릭
3. Secret 추가:
   - **Name**: `BLOG_REPO_TOKEN`
   - **Secret**: (위에서 복사한 PAT 붙여넣기)
4. "Add secret" 클릭

---

## Step 3: Test Post 작성

Vault가 설정되면 테스트 포스트를 작성해봅시다:

`published/test-obsidian-sync.md`:

```markdown
---
title: "Testing Obsidian Sync"
date: "2025-02-13"
excerpt: "This is a test post from Obsidian vault"
tags: ["Test"]
category: "Meta"
---

# Testing Obsidian Integration

This post was written in Obsidian and automatically synced to the blog!

## Obsidian Features

- [[Internal Links]] (will be converted)
- ![[image.png]] (image embeds)
- Regular markdown

More content here...
```

---

## 다음 단계

이제 GitHub Actions workflow를 설정하겠습니다.
