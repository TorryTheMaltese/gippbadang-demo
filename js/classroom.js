import { $, openModal, closeModal, showToast } from './app.js';

export function initClassroom() {
  $('#createLessonButton').addEventListener('click', () => {
    openModal(`<span class="eyebrow">NEW LEARNING ACTIVITY</span><h2 id="modalTitle">새 수업 활동 만들기</h2><p>직접 만들거나 AI와 대화하며 문제와 활동지를 생성할 수 있습니다.</p><form class="modal-form" id="lessonForm"><label>활동 유형</label><select><option>형성평가</option><option>퀴즈</option><option>서술형 활동</option><option>프로젝트</option></select><label>활동 이름</label><input placeholder="예: 이차함수 형성평가"><label>제작 방식</label><select><option>AI와 함께 만들기</option><option>직접 문항 작성</option><option>기존 자료 불러오기</option></select><div class="modal-actions"><button type="button" class="secondary-button" id="cancelLesson">취소</button><button class="primary-button">만들기 시작</button></div></form>`);
    $('#cancelLesson').addEventListener('click', closeModal);
    $('#lessonForm').addEventListener('submit', event => { event.preventDefault(); closeModal(); showToast('새 활동 제작을 시작합니다.'); });
  });
}
