import { $, $$, openModal, closeModal, showToast } from "./app.js";

function privacyModal() {
  openModal(
    `<span class="eyebrow">PRIVACY BY DEFAULT</span><h2 id="modalTitle">질의 전 개인정보를 먼저 보호합니다</h2><p>어떤 상용 AI를 선택하더라도 깊바당의 보호 계층을 반드시 거칩니다. 외부 AI에는 마스킹된 정보만 전달됩니다.</p><div class="process-list"><div class="process-step"><b>1</b><div><strong>안전 영역에서 자료 불러오기</strong><small>바당 SSO 권한에 따라 학생 명부, 학습 기록과 교육자료에 접근합니다.</small></div></div><div class="process-step"><b>2</b><div><strong>개인정보 자동 식별</strong><small>이름·생년월일·연락처·학번 등 개인을 식별할 수 있는 정보를 탐지합니다.</small></div></div><div class="process-step"><b>3</b><div><strong>가명처리 및 마스킹</strong><small>질의에 필요한 관계는 유지하면서 식별정보를 안전한 대체값으로 바꿉니다.</small></div></div><div class="process-step"><b>4</b><div><strong>선택한 AI에 안전하게 전달</strong><small>마스킹된 질의만 API로 전송하고, 응답은 다시 교사에게 읽기 쉽게 정리합니다.</small></div></div></div><div class="mask-example">원문: 김에이 학생의 최근 평가 결과를 분석해줘.<br>전송: [학생_A]의 최근 평가 결과를 분석해줘.</div>`,
  );
}

function appendProblemResponse() {
  const conversation = $("#conversation");

  const article = document.createElement("article");
  article.className = "message ai-message";

  article.innerHTML = `
    <div class="message-avatar">깊</div>

    <div class="message-body">
      <div class="message-meta">
        <strong>깊바당 AI</strong>
        <span class="model-chip">
          ${$("#modelSelect").selectedOptions[0].text}
        </span>
        <time>지금</time>
      </div>

      <div class="typing">
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  `;

  conversation.appendChild(article);

  article.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  setTimeout(() => {
    article.querySelector(".message-body").innerHTML = `
      <div class="message-meta">
        <strong>깊바당 AI</strong>

        <span class="model-chip">
          ${$("#modelSelect").selectedOptions[0].text}
        </span>

        <time>지금</time>
      </div>

      <div class="context-note">
        ◉ <strong>참조한 자료</strong>
       　우리반 학습현황 · 교육자료.pptx
      </div>

      <p>
        우리반의 현재 진도와 학생별 학습 수준을 반영해
        <strong>이차함수 형성평가 5문항</strong>을 만들었어요.
      </p>

      <div class="generated-card">
        <div class="generated-head">
          <div>
            <span>수학 · 고1</span>
            <h3>이차함수의 그래프와 성질</h3>
          </div>

          <span class="status-badge">5문항</span>
        </div>

        <ol class="question-preview">
          <li>
            <span>기본</span>
            이차함수 <i>y = 2x²</i>의 그래프에 대한 설명으로
            옳은 것은?
          </li>

          <li>
            <span>기본</span>
            함수 <i>y = −x² + 4</i>의 꼭짓점 좌표를 구하세요.
          </li>

          <li>
            <span class="medium">응용</span>
            그래프가 점 (2, 8)을 지날 때,
            <i>y = ax²</i>의 <i>a</i> 값을 구하세요.
          </li>
        </ol>

        <button class="text-button generated-expand-button">
          나머지 2문항 보기⌄
        </button>
      </div>

      <p>
        학생들에게 바로 배포하거나, 난이도와 문항 수를
        조정할 수 있어요.
      </p>

      <div class="message-actions">
        <button class="primary-button generated-distribute-button">
          ▣ 우리반에 배포
        </button>

        <button class="secondary-button generated-edit-button">
          ✎ 문제 편집
        </button>

        <button class="icon-button" title="복사">
          ▢
        </button>
      </div>
    `;

    const expandButton = article.querySelector(".generated-expand-button");

    expandButton.addEventListener("click", () => {
      article.querySelector(".question-preview").insertAdjacentHTML(
        "beforeend",
        `
            <li>
              <span class="medium">응용</span>
              두 이차함수의 그래프를 비교하고 공통점과
              차이점을 설명하세요.
            </li>

            <li>
              <span>도전</span>
              생활 속 이차함수 사례를 찾아 식과 그래프로
              나타내세요.
            </li>
          `,
      );

      expandButton.remove();
    });

    article
      .querySelector(".generated-distribute-button")
      .addEventListener("click", distributionModal);

    article.querySelector(".generated-edit-button").addEventListener("click", () => {
      showToast("문제 편집 화면을 불러왔습니다.");
    });

    article.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 900);
}

function appendGraphResponse() {
  const conversation = $("#conversation");
  const article = document.createElement("article");

  article.className = "message ai-message";

  article.innerHTML = `
    <div class="message-avatar">깊</div>

    <div class="message-body">
      <div class="message-meta">
        <strong>깊바당 AI</strong>

        <span class="model-chip">
          ${$("#modelSelect").selectedOptions[0].text}
        </span>

        <time>지금</time>
      </div>

      <div class="typing">
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  `;

  conversation.appendChild(article);

  setTimeout(() => {
    article.querySelector(".message-body").innerHTML = `
      <div class="message-meta">
        <strong>깊바당 AI</strong>

        <span class="model-chip">
          ${$("#modelSelect").selectedOptions[0].text}
        </span>

        <time>지금</time>
      </div>

      <p>
        이차함수
        <strong>y = ax² + bx + c</strong>의 계수를 조절하며
        그래프의 변화를 확인해 보세요.
      </p>

      <div class="quadratic-tool">
        <div class="quadratic-heading">
          <div>
            <span>INTERACTIVE GRAPH</span>
            <h3 class="quadratic-equation">
              y = x²
            </h3>
          </div>

          <span class="status-badge">실시간 반영</span>
        </div>

        <div class="quadratic-layout">
          <div class="quadratic-controls">
            ${createCoefficientControl("a", 1)}
            ${createCoefficientControl("b", 0)}
            ${createCoefficientControl("c", 0)}
          </div>

          <div class="quadratic-canvas-wrap">
            <canvas
              class="quadratic-canvas"
              aria-label="이차함수 그래프"
            ></canvas>
          </div>
        </div>
      </div>

      <p class="graph-description">
        슬라이더를 움직이거나 숫자를 직접 입력하면 그래프가
        바로 변경됩니다.
      </p>
    `;

    initializeQuadraticGraph(article);

    article.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 700);
}

function createCoefficientControl(name, value) {
  return `
    <div class="coefficient-control">
      <div class="coefficient-label">
        <label>
          계수 ${name}
        </label>

        <input
          class="coefficient-number"
          data-coefficient="${name}"
          data-input-type="number"
          type="number"
          min="-5"
          max="5"
          step="0.1"
          value="${value}"
          aria-label="계수 ${name} 숫자 입력"
        >
      </div>

      <input
        class="coefficient-range"
        data-coefficient="${name}"
        data-input-type="range"
        type="range"
        min="-5"
        max="5"
        step="0.1"
        value="${value}"
        aria-label="계수 ${name} 슬라이더"
      >
    </div>
  `;
}

function initializeQuadraticGraph(article) {
  const canvas = article.querySelector(".quadratic-canvas");
  const equation = article.querySelector(".quadratic-equation");

  const ranges = article.querySelectorAll(".coefficient-range");

  const numbers = article.querySelectorAll(".coefficient-number");

  const coefficients = {
    a: 1,
    b: 0,
    c: 0,
  };

  function updateCoefficient(event) {
    const input = event.target;
    const name = input.dataset.coefficient;

    let value = Number(input.value);

    if (!Number.isFinite(value)) {
      return;
    }

    value = Math.max(-5, Math.min(5, value));
    coefficients[name] = value;

    article.querySelectorAll(`[data-coefficient="${name}"]`).forEach((connectedInput) => {
      if (connectedInput !== input) {
        connectedInput.value = value;
      }
    });

    equation.textContent = formatEquation(coefficients.a, coefficients.b, coefficients.c);

    drawQuadraticGraph(canvas, coefficients);
  }

  ranges.forEach((input) => {
    input.addEventListener("input", updateCoefficient);
  });

  numbers.forEach((input) => {
    input.addEventListener("input", updateCoefficient);
  });

  const resizeObserver = new ResizeObserver(() => {
    drawQuadraticGraph(canvas, coefficients);
  });

  resizeObserver.observe(canvas.parentElement);

  equation.textContent = formatEquation(coefficients.a, coefficients.b, coefficients.c);

  drawQuadraticGraph(canvas, coefficients);
}

function formatEquation(a, b, c) {
  const formatNumber = (value) => {
    if (Number.isInteger(value)) {
      return String(value);
    }

    return value.toFixed(1);
  };

  let equation = "y = ";

  if (a === 1) {
    equation += "x²";
  } else if (a === -1) {
    equation += "−x²";
  } else {
    equation += `${formatNumber(a)}x²`;
  }

  if (b !== 0) {
    const sign = b > 0 ? " + " : " − ";
    const absolute = Math.abs(b);

    equation += sign;

    if (absolute === 1) {
      equation += "x";
    } else {
      equation += `${formatNumber(absolute)}x`;
    }
  }

  if (c !== 0) {
    const sign = c > 0 ? " + " : " − ";

    equation += `${sign}${formatNumber(Math.abs(c))}`;
  }

  return equation;
}

function drawQuadraticGraph(canvas, coefficients) {
  const container = canvas.parentElement;
  const width = Math.max(container.clientWidth, 280);
  const height = Math.min(Math.max(width * 0.58, 260), 430);

  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d");

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  context.clearRect(0, 0, width, height);

  const xMin = -10;
  const xMax = 10;
  const yMin = -10;
  const yMax = 10;

  const toCanvasX = (x) => {
    return ((x - xMin) / (xMax - xMin)) * width;
  };

  const toCanvasY = (y) => {
    return height - ((y - yMin) / (yMax - yMin)) * height;
  };

  // 배경
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  // 격자
  context.lineWidth = 1;
  context.strokeStyle = "#e8ebf2";

  for (let x = xMin; x <= xMax; x += 1) {
    const canvasX = toCanvasX(x);

    context.beginPath();
    context.moveTo(canvasX, 0);
    context.lineTo(canvasX, height);
    context.stroke();
  }

  for (let y = yMin; y <= yMax; y += 1) {
    const canvasY = toCanvasY(y);

    context.beginPath();
    context.moveTo(0, canvasY);
    context.lineTo(width, canvasY);
    context.stroke();
  }

  // x축, y축
  context.lineWidth = 1.5;
  context.strokeStyle = "#667085";

  context.beginPath();
  context.moveTo(0, toCanvasY(0));
  context.lineTo(width, toCanvasY(0));
  context.stroke();

  context.beginPath();
  context.moveTo(toCanvasX(0), 0);
  context.lineTo(toCanvasX(0), height);
  context.stroke();

  // 축 눈금 숫자
  context.fillStyle = "#7b8495";
  context.font = "10px sans-serif";

  for (let x = xMin; x <= xMax; x += 2) {
    if (x === 0) {
      continue;
    }

    context.fillText(String(x), toCanvasX(x) - 5, toCanvasY(0) + 14);
  }

  for (let y = yMin; y <= yMax; y += 2) {
    if (y === 0) {
      continue;
    }

    context.fillText(String(y), toCanvasX(0) + 5, toCanvasY(y) + 3);
  }

  // 이차함수 곡선
  context.beginPath();
  context.lineWidth = 3;
  context.strokeStyle = "#6656d9";
  context.lineJoin = "round";

  let curveStarted = false;

  for (let pixelX = 0; pixelX <= width; pixelX += 1) {
    const x = xMin + (pixelX / width) * (xMax - xMin);

    const y = coefficients.a * x * x + coefficients.b * x + coefficients.c;

    const canvasY = toCanvasY(y);

    if (canvasY < -height || canvasY > height * 2) {
      curveStarted = false;
      continue;
    }

    if (!curveStarted) {
      context.moveTo(pixelX, canvasY);
      curveStarted = true;
    } else {
      context.lineTo(pixelX, canvasY);
    }
  }

  context.stroke();

  // 꼭짓점 표시
  if (coefficients.a !== 0) {
    const vertexX = -coefficients.b / (2 * coefficients.a);

    const vertexY = coefficients.a * vertexX * vertexX + coefficients.b * vertexX + coefficients.c;

    if (vertexX >= xMin && vertexX <= xMax && vertexY >= yMin && vertexY <= yMax) {
      context.beginPath();
      context.fillStyle = "#29b8b0";
      context.arc(toCanvasX(vertexX), toCanvasY(vertexY), 5, 0, Math.PI * 2);
      context.fill();
    }
  }
}

function appendUnsupportedResponse() {
  const conversation = $("#conversation");
  const article = document.createElement("article");

  article.className = "message ai-message";

  article.innerHTML = `
    <div class="message-avatar">깊</div>

    <div class="message-body">
      <div class="message-meta">
        <strong>깊바당 AI</strong>
        <time>지금</time>
      </div>

      <p>
        이 콘셉트 데모에서는 준비된 예시 질의를 입력해 주세요.
      </p>

      <div class="demo-query-list">
        <button type="button">
          2차 함수 문제를 만들어줘
        </button>

        <button type="button">
          2차 함수 그래프 만들어줘
        </button>
      </div>
    </div>
  `;

  conversation.appendChild(article);

  article.querySelectorAll(".demo-query-list button").forEach((button) => {
    button.addEventListener("click", () => {
      $("#promptInput").value = button.textContent.trim();
      $("#promptInput").focus();
    });
  });
}

function sendPrompt() {
  const input = $("#promptInput");
  const prompt = input.value.trim();

  // 빈 입력값은 아무 반응도 하지 않음
  if (!prompt) {
    return;
  }

  $("#chatView").classList.remove("empty-state");

  const article = document.createElement("article");
  article.className = "message user-message";

  article.innerHTML = `
    <div class="message-avatar">나</div>

    <div class="message-body">
      <div class="message-meta">
        <strong>김바당 선생님</strong>
        <time>지금</time>
      </div>

      <p></p>
    </div>
  `;

  article.querySelector("p").textContent = prompt;
  $("#conversation").appendChild(article);

  input.value = "";
  input.style.height = "auto";

  if (prompt === "2차 함수 문제를 만들어줘") {
    appendProblemResponse();
    return;
  }

  if (prompt === "2차 함수 그래프 만들어줘") {
    appendGraphResponse();
    return;
  }

  appendUnsupportedResponse();
}

function distributionModal() {
  openModal(
    `<span class="eyebrow">DISTRIBUTE ACTIVITY</span><h2 id="modalTitle">학생에게 문제 배포</h2><p>배포 후 학생의 풀이 진행 상황과 질문을 교사 화면에서 실시간으로 확인할 수 있습니다.</p><form class="modal-form" id="distributionForm"><label>대상 학급</label><select><option>1학년 1반 (3명)</option></select><label>활동 종료</label><input type="datetime-local" value="2026-07-15T16:00"><label>학생에게 보일 안내</label><textarea>이차함수 형성평가입니다. 풀이 중 궁금한 점은 질문 버튼을 눌러 남겨주세요.</textarea><div class="modal-actions"><button type="button" class="secondary-button" id="cancelDistribution">취소</button><button class="primary-button">3명에게 배포</button></div></form>`,
  );
  $("#cancelDistribution").addEventListener("click", closeModal);
  $("#distributionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    closeModal();
    showToast("1학년 1반 학생 3명에게 문제를 배포했습니다.");
  });
}

export function initChat() {
  $("#privacyDetailButton").addEventListener("click", privacyModal);
  $("#sendButton").addEventListener("click", sendPrompt);
  $("#promptInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendPrompt();
    }
  });
  $("#promptInput").addEventListener("input", (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  });
  $("#modelSelect").addEventListener("change", (event) => {
    $$(".model-chip").forEach((chip) => (chip.textContent = event.target.selectedOptions[0].text));
    showToast(`${event.target.selectedOptions[0].text} 모델을 선택했습니다.`);
  });
  $("#attachButton").addEventListener("click", () =>
    showToast("왼쪽 드라이브에서 연결할 자료를 선택해 주세요."),
  );
  $$(".context-chips button").forEach((button) =>
    button.addEventListener("click", () => button.parentElement.remove()),
  );
}
