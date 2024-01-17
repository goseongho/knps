document.addEventListener('DOMContentLoaded', function() {
  // 메인 네비게이션 요소선택
  const mainGnb = document.querySelectorAll('#main_gnb>ul>li');

  // 각 메뉴에 이벤트 리스너를 추가
  mainGnb.forEach(function(item) {
    // 마우스 오버 시 서브 메뉴를 보여주기
    item.addEventListener('mouseover', function() {
      const gnbSunInner = this.querySelector('.gnb_sunInner');
      if (gnbSunInner) {
        slideDown(gnbSunInner);
      }
    });
    // 마우스 아웃 시 서브 메뉴를 숨기기
    item.addEventListener('mouseout', function() {
      const gnbSunInner = this.querySelector('.gnb_sunInner');
      if (gnbSunInner) {
        slideUp(gnbSunInner);
      }
    });
  });

  // 각 서브 메뉴 요소를 배열로 가져오자
  const subMenus = [
    ".testsub00", ".testsub01", ".testsub02", ".testsub03", ".testsub04", ".testsub05", ".testsub06"
  ];

  // 각 메뉴에 대한 이벤트 리스너를 추가하고
  for (let i = 0; i < mainGnb.length; i++) {
    const gnbNum = "gnb_num0" + i;
    const index = i < 10 ? "0" + i : i;
    const currentSubMenu = document.querySelector(subMenus[i]);

    // 해당 클래스를 포함하는 경우 이벤트 리스너를 추가
    if (mainGnb[i].classList.contains(gnbNum)) {
      mainGnb[i].addEventListener('mouseover', function() {
        if (currentSubMenu) {
          slideDown(currentSubMenu);
        }
      });

      mainGnb[i].addEventListener('mouseout', function() {
        if (currentSubMenu) {
          slideUp(currentSubMenu);
        }
      });
    }
  }
});

// 요소를 슬라이드 다운시킨다...블록
function slideDown(element) {
  element.style.display = 'block';
  
}

// 요소를 숨긴다
function slideUp(element) {
  element.style.display = 'none';
}

//subpage
// 한 페이지에 보여질 행의 수와 테이블의 행을 가져오는 부분
const rowsPerPage = 10; // 한 페이지에 보여질 행의 수
const rows = document.querySelectorAll('#my-table tbody tr'); // 테이블의 모든 행을 가져옵니다.
const rowsCount = rows.length; // 전체 행 개수를 세어서
//Math.ceil소수점에서 올림
const pageCount = Math.ceil(rowsCount / rowsPerPage); // 페이지 개수를 계산
const numbers = document.querySelector('#numbers'); // 페이지 번호를 표시할 요소를 가져옵니다.
// 추가된 변수들
const prevPageBtn = document.querySelector('.pagination .fa-arrow-left'); // 이전 페이지 버튼
const nextPageBtn = document.querySelector('.pagination .fa-arrow-right'); // 다음 페이지 버튼
let pageActiveIdx = 0; // 현재 보고 있는 페이지 그룹 번호
let currentPageNum = 0; // 현재 보고 있는 페이지 번호
let maxPageNum = 3; // 한 번에 보여줄 페이지 그룹의 최대 개수

// 페이지 번호 생성 및 숨기기
for (let i = 1; i <= pageCount; i++) {
    numbers.innerHTML += `<li><a href="">${i}</a></li>`; 
}
const numberBtn = numbers.querySelectorAll('a'); // 생성된 페이지 번호 요소

// 생성된 페이지 번호 숨기기
for (nb of numberBtn) {
  nb.style.display = 'none';
}

// 각 페이지 번호 클릭 시 처리하는 함수들
numberBtn.forEach((item, idx) => {
  item.addEventListener('click', (e) => {
      e.preventDefault(); // 기본 동작 방지
      displayRow(idx); // 해당 페이지의 행을 보여주는 함수를 호출
  });
});

// 현재 페이지의 행을 보여주는 함수
function displayRow(idx) {
  let start = idx * rowsPerPage; // 해당 페이지의 시작 인덱스 계산
  let end = start + rowsPerPage; // 해당 페이지의 끝 인덱스 계산

  let rowsArray = [...rows]; // 모든 행을 담은 배열을 만들기

  // 모든 행을 숨깁니다.
  for (ra of rowsArray) {
      ra.style.display = 'none';
  }

  // 현재 페이지에 해당하는 행만 표시
  let newRows = rowsArray.slice(start, end);
  for (nr of newRows) {
      nr.style.display = '';
  }

  // 선택된 페이지 번호를 강조 표시
  for (nb of numberBtn) {
      nb.classList.remove('active');
  }
  numberBtn[idx].classList.add('active');
}

displayRow(0); // 초기 페이지 설정

// 페이지 그룹을 보여주는 함수
function displayPage(num) {
  // 모든 페이지 번호를 숨깁니다.
  for (nb of numberBtn) {
      nb.style.display = 'none';
  }
  let totalPageCount = Math.ceil(pageCount / maxPageNum); // 전체 페이지 그룹 개수를 계산
  let pageArr = [...numberBtn]; // 모든 페이지 번호를 담은 배열을 만듭니다.
  let start = num * maxPageNum; // 시작 페이지 번호
  let end = start + maxPageNum; // 끝 페이지 번호
  let pageListArr = pageArr.slice(start, end); // 보여질 페이지 그룹 배열을 만듭니다.

  // 선택된 페이지 그룹만 표시
  for (let item of pageListArr) {
      item.style.display = 'block';
  }

  // 이전 페이지 버튼의 표시 여부 설정
  if (pageActiveIdx == 0) {
      prevPageBtn.style.display = 'none';
  } else {
      prevPageBtn.style.display = 'block';
  }
  // 다음 페이지 버튼의 표시 여부 설정
  if (pageActiveIdx == totalPageCount - 1) {
      nextPageBtn.style.display = 'none';
  } else {
      nextPageBtn.style.display = 'block';
  }
}

displayPage(0); // 초기 페이지 그룹 설정

// 다음 페이지 버튼 클릭 시 처리
nextPageBtn.addEventListener('click', () => {
    let nextPageNum = pageActiveIdx * maxPageNum + maxPageNum; // 다음 페이지 그룹의 시작 번호를 계산
    displayRow(nextPageNum); // 해당 페이지의 행을 보여줍니다.
    ++pageActiveIdx; // 페이지 그룹 번호를 증가시킵니다.
    displayPage(pageActiveIdx); // 페이지 그룹을 다시 표시
});

// 이전 페이지 버튼 클릭 시 처리
prevPageBtn.addEventListener('click', () => {
    let prevPageNum = pageActiveIdx * maxPageNum - maxPageNum; // 이전 페이지 그룹의 시작 번호를 계산
    displayRow(prevPageNum); // 해당 페이지의 행을 보여줍니다.
    --pageActiveIdx; // 페이지 그룹 번호를 감소시킵니다.
    displayPage(pageActiveIdx); // 페이지 그룹을 다시 표시
});
