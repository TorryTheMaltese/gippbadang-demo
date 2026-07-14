import { $, $$, openModal, closeModal, showToast } from './app.js';

export function initPlugins() {
  $$('.plugin-tabs button').forEach(button => button.addEventListener('click', () => {
    $$('.plugin-tabs button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.pluginFilter;
    $$('.plugin-card').forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
  }));
  $$('.plugin-action').forEach(button => button.addEventListener('click', () => {
    const installed = button.dataset.installed === 'true';
    button.dataset.installed = String(!installed);
    button.textContent = installed ? '설치' : '삭제';
    button.classList.toggle('primary-button', installed);
    button.classList.toggle('secondary-button', !installed);
    showToast(installed ? '플러그인을 삭제했습니다.' : '플러그인을 설치했습니다. AI 대화에서 바로 사용할 수 있어요.');
  }));
  $('#createPluginButton').addEventListener('click', () => {
    openModal(`<span class="eyebrow">PLUGIN BUILDER</span><h2 id="modalTitle">대화로 나만의 플러그인 만들기</h2><p>챗봇에 학습시킨 업무 절차를 재사용 가능한 도구로 만들고 동료와 공유할 수 있습니다.</p><form class="modal-form" id="pluginForm"><label>플러그인 이름</label><input placeholder="예: 우리 반 독서기록 도우미"><label>어떤 일을 하나요?</label><textarea placeholder="AI가 수행할 업무와 사용할 자료를 자연어로 설명하세요."></textarea><label>공개 범위</label><select><option>나만 사용</option><option>우리 학교에 공유</option><option>전체 교사에게 공개</option></select><div class="modal-actions"><button type="button" class="secondary-button" id="cancelPlugin">취소</button><button class="primary-button">✦ AI로 만들기</button></div></form>`);
    $('#cancelPlugin').addEventListener('click', closeModal);
    $('#pluginForm').addEventListener('submit', event => { event.preventDefault(); closeModal(); showToast('플러그인 초안을 생성하고 있습니다.'); });
  });
}
