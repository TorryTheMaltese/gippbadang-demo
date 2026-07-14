import { $, $$, openModal, closeModal, showToast } from './app.js';

function privacyModal() {
  openModal(`<span class="eyebrow">PRIVACY BY DEFAULT</span><h2 id="modalTitle">질의 전 개인정보를 먼저 보호합니다</h2><p>어떤 상용 AI를 선택하더라도 깊바당의 보호 계층을 반드시 거칩니다. 외부 AI에는 마스킹된 정보만 전달됩니다.</p><div class="process-list"><div class="process-step"><b>1</b><div><strong>안전 영역에서 자료 불러오기</strong><small>바당 SSO 권한에 따라 학생 명부, 학습 기록과 교육자료에 접근합니다.</small></div></div><div class="process-step"><b>2</b><div><strong>개인정보 자동 식별</strong><small>이름·생년월일·연락처·학번 등 개인을 식별할 수 있는 정보를 탐지합니다.</small></div></div><div class="process-step"><b>3</b><div><strong>가명처리 및 마스킹</strong><small>질의에 필요한 관계는 유지하면서 식별정보를 안전한 대체값으로 바꿉니다.</small></div></div><div class="process-step"><b>4</b><div><strong>선택한 AI에 안전하게 전달</strong><small>마스킹된 질의만 API로 전송하고, 응답은 다시 교사에게 읽기 쉽게 정리합니다.</small></div></div></div><div class="mask-example">원문: 김에이 학생의 최근 평가 결과를 분석해줘.<br>전송: [학생_A]의 최근 평가 결과를 분석해줘.</div>`);
}

function appendDemoResponse(prompt) {
  const conversation = $('#conversation');
  const article = document.createElement('article');
  article.className = 'message ai-message';
  article.innerHTML = `<div class="message-avatar">깊</div><div class="message-body"><div class="message-meta"><strong>깊바당 AI</strong><span class="model-chip">${$('#modelSelect').selectedOptions[0].text}</span><time>지금</time></div><div class="typing"><i></i><i></i><i></i></div></div>`;
  conversation.appendChild(article);
  article.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => {
    article.querySelector('.message-body').innerHTML = `<div class="message-meta"><strong>깊바당 AI</strong><span class="model-chip">${$('#modelSelect').selectedOptions[0].text}</span><time>지금</time></div><div class="context-note">✓ 개인정보 마스킹 완료 · 연결 자료 2개 참조</div><p><strong>“${prompt}”</strong> 요청을 확인했어요.</p><p>이 콘셉트 데모에서는 실제 AI 대신 예시 응답을 보여드립니다. 실제 서비스에서는 연결된 학급 정보와 교육자료를 바탕으로 결과를 생성하고, 표·목록·문서 등 읽기 좋은 형식으로 제공하게 됩니다.</p>`;
  }, 900);
}

function sendPrompt() {
  const input = $('#promptInput');
  const prompt = input.value.trim();
  if (!prompt) return;
  const article = document.createElement('article');
  article.className = 'message user-message';
  article.innerHTML = `<div class="message-avatar">나</div><div class="message-body"><div class="message-meta"><strong>김바당 선생님</strong><time>지금</time></div><p></p></div>`;
  article.querySelector('p').textContent = prompt;
  $('#conversation').appendChild(article);
  input.value = '';
  input.style.height = 'auto';
  appendDemoResponse(prompt);
}

function distributionModal() {
  openModal(`<span class="eyebrow">DISTRIBUTE ACTIVITY</span><h2 id="modalTitle">학생에게 문제 배포</h2><p>배포 후 학생의 풀이 진행 상황과 질문을 교사 화면에서 실시간으로 확인할 수 있습니다.</p><form class="modal-form" id="distributionForm"><label>대상 학급</label><select><option>1학년 1반 (3명)</option></select><label>활동 종료</label><input type="datetime-local" value="2026-07-15T16:00"><label>학생에게 보일 안내</label><textarea>이차함수 형성평가입니다. 풀이 중 궁금한 점은 질문 버튼을 눌러 남겨주세요.</textarea><div class="modal-actions"><button type="button" class="secondary-button" id="cancelDistribution">취소</button><button class="primary-button">3명에게 배포</button></div></form>`);
  $('#cancelDistribution').addEventListener('click', closeModal);
  $('#distributionForm').addEventListener('submit', event => { event.preventDefault(); closeModal(); showToast('1학년 1반 학생 3명에게 문제를 배포했습니다.'); });
}

export function initChat() {
  $('#privacyDetailButton').addEventListener('click', privacyModal);
  $('#sendButton').addEventListener('click', sendPrompt);
  $('#promptInput').addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendPrompt(); } });
  $('#promptInput').addEventListener('input', event => { event.target.style.height = 'auto'; event.target.style.height = `${event.target.scrollHeight}px`; });
  $('#modelSelect').addEventListener('change', event => { $$('.model-chip').forEach(chip => chip.textContent = event.target.selectedOptions[0].text); showToast(`${event.target.selectedOptions[0].text} 모델을 선택했습니다.`); });
  $('#sendToClassButton').addEventListener('click', distributionModal);
  $('#editQuestionButton').addEventListener('click', () => showToast('문제 편집 화면을 불러왔습니다.'));
  $('#attachButton').addEventListener('click', () => showToast('왼쪽 드라이브에서 연결할 자료를 선택해 주세요.'));
  $('#expandQuestions').addEventListener('click', event => { event.target.previousElementSibling.insertAdjacentHTML('beforeend', '<li><span class="medium">응용</span> 두 이차함수의 그래프를 비교하고 공통점과 차이점을 설명하세요.</li><li><span>도전</span> 생활 속 이차함수 사례를 하나 찾아 식과 그래프로 나타내세요.</li>'); event.target.remove(); });
  $$('.context-chips button').forEach(button => button.addEventListener('click', () => button.parentElement.remove()));
}
