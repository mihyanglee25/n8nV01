# n8nV01 공통 메뉴 분리 버전

현재 공개 사이트의 Tomato UI 구조를 기준으로 만든 변경 패키지입니다.

## 핵심 변경
- `index.html`: 상단 Header + 좌측 메뉴 iframe + 우측 Content iframe
- `HTML/menun8n.html`: 모든 Chapter 공통 왼쪽 메뉴
- `HTML/chapter00.html` ~ `chapter99.html`: 중복 왼쪽 메뉴 제거, 오른쪽 본문 전용
- `HTML/home.html`: 우측 HOME 화면
- `JavaScript/shell.js`: 메뉴 클릭 시 오른쪽 iframe 교체, 모바일 메뉴 토글
- `JavaScript/content.js`: 우측 카드 검색
- `CSS/style.css`: 기존 Tomato UI 유지 + iframe shell 스타일 추가

## 적용 방법
기존 `n8nV01` 폴더를 먼저 백업한 뒤 이 ZIP의 내용을 루트에 덮어쓰세요.

기존 상세 페이지(`chapterXXCnt.html`, `chapterXX_01Cnt.html` 등)와 `Img/`는 삭제하지 마세요.

## 상세 Cnt 페이지까지 공통 메뉴를 제거하려면
이 패키지를 기존 프로젝트에 복사한 후:

```powershell
python .\refactor_existing_detail_pages.py
```

스크립트는 기존 HTML을 `_backup_before_menu_refactor_날짜시간` 폴더에 백업하고,
각 페이지의 `<main class="content">...</main>`만 남겨 오른쪽 본문 전용으로 바꿉니다.

## 로컬 확인
```powershell
python -m http.server 8000
```

브라우저에서:
`http://localhost:8000/`

## 체크
1. 왼쪽 메뉴가 `HTML/menun8n.html` 한 파일에서만 보이는지
2. 메뉴 클릭 시 오른쪽 iframe만 변경되는지
3. Tomato `#FF6347` UI가 유지되는지
4. 모바일에서 `목차` 버튼으로 메뉴가 열리고 닫히는지
5. F12 → Network에서 404가 없는지
