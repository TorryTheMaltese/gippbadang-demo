import { $, showToast, openModal, closeModal } from './app.js';

const driveData = [
  {
    label: '내 자료',
    type: 'folder',
    open: true,
    children: [
      { label: '한글서식.hwpx', type: 'document' },
      { label: '교육자료.pptx', type: 'presentation' },
      { label: '바당사용매뉴얼.pdf', type: 'pdf', selected: true }
    ]
  },
  {
    label: '우리반',
    type: 'class',
    open: true,
    badge: '3명',
    children: [
      { label: '1번 김에이', type: 'student' },
      { label: '2번 이비', type: 'student' },
      { label: '3번 박시', type: 'student' }
    ]
  }
];

const icons = {
  folder: '📁',
  class: '▣',
  student: '♙',
  document: '▤',
  presentation: '▥',
  sheet: '▦',
  pdf: '▧',
  quiz: '◈'
};
function renderNode(node) {
  const hasChildren = node.children?.length;
  const element = document.createElement('div');
  element.className = `tree-node ${hasChildren && !node.open ? 'collapsed' : ''}`;
  element.innerHTML = `<div class="tree-row ${node.selected ? 'selected' : ''}"><span class="tree-toggle">${hasChildren ? (node.open ? '▼' : '▶') : ''}</span><span class="tree-icon">${icons[node.type] || '▧'}</span><span class="tree-label">${node.label}</span>${node.badge ? `<span class="tree-badge">${node.badge}</span>` : ''}<button class="tree-more" aria-label="${node.label} 관리">⋮</button></div>`;
  const row = element.firstElementChild;
  row.addEventListener('click', () => {
    if (hasChildren) {
      element.classList.toggle('collapsed');
      row.querySelector('.tree-toggle').textContent = element.classList.contains('collapsed') ? '▶' : '▼';
    } else {
      document.querySelectorAll('.tree-row').forEach(item => item.classList.remove('selected'));
      row.classList.add('selected');
      showToast(`${node.label} 자료를 대화에 연결했습니다.`);
    }
  });
  row.querySelector('.tree-more').addEventListener('click', event => {
    event.stopPropagation();
    openModal(`<span class="eyebrow">DATA MANAGEMENT</span><h2 id="modalTitle">${node.label}</h2><p>권한 범위 안에서 자료를 조회·수정·이동·삭제할 수 있습니다. 학생 기본정보는 바당 원본과 동기화됩니다.</p><div class="file-action-list"><button data-action="open">▣ 열기 및 대화에 연결</button><button data-action="rename">✎ 이름 변경</button><button data-action="move">↗ 다른 폴더로 이동</button><button class="danger-action" data-action="delete">⌫ 삭제</button></div>`);
    document.querySelectorAll('.file-action-list button').forEach(button => button.addEventListener('click', () => {
      closeModal();
      const labels = { open: '자료를 열어 대화에 연결했습니다.', rename: '이름을 변경할 수 있는 편집 화면을 열었습니다.', move: '이동할 폴더를 선택할 수 있습니다.', delete: '삭제 전 확인 절차를 진행합니다.' };
      showToast(labels[button.dataset.action]);
    }));
  });
  if (hasChildren) {
    const children = document.createElement('div');
    children.className = 'tree-children';
    node.children.forEach(child => children.appendChild(renderNode(child)));
    element.appendChild(children);
  }
  return element;
}

function openCreateModal(type) {
  openModal(`<span class="eyebrow">MY SANDBOX</span><h2 id="modalTitle">${type === 'folder' ? '새 폴더 만들기' : '자료 업로드'}</h2><p>추가한 자료는 깊바당 AI 대화에서 별도 업로드 없이 바로 활용할 수 있습니다.</p><form class="modal-form" id="driveForm"><label>${type === 'folder' ? '폴더 이름' : '파일 선택'}</label><input ${type === 'folder' ? 'type="text" placeholder="폴더 이름을 입력하세요"' : 'type="file" multiple'} required><label>저장 위치</label><select><option>수업 자료</option><option>내 드라이브</option><option>1학년 1반</option></select><div class="modal-actions"><button type="button" class="secondary-button" id="cancelDrive">취소</button><button class="primary-button">${type === 'folder' ? '만들기' : '업로드'}</button></div></form>`);
  $('#cancelDrive').addEventListener('click', closeModal);
  $('#driveForm').addEventListener('submit', event => { event.preventDefault(); closeModal(); showToast(type === 'folder' ? '새 폴더를 만들었습니다.' : '자료를 안전하게 업로드했습니다.'); });
}

export function initDrive() {
  const tree = $('#fileTree');
  driveData.forEach(node => tree.appendChild(renderNode(node)));
  $('#uploadButton').addEventListener('click', () => openCreateModal('file'));
  $('#newFolderButton').addEventListener('click', () => openCreateModal('folder'));
  $('#addFileButton').addEventListener('click', () => openCreateModal('file'));
}
