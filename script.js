let projectsData = null;
let currentTab = 1;

document.addEventListener('DOMContentLoaded', async () => {
    await loadProjects();
    renderTabs();
    renderProject(currentTab);
});

async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        projectsData = data.projects;
    } catch (error) {
        console.error('프로젝트 데이터를 불러오는데 실패했습니다:', error);
    }
}

function renderTabs() {
    const tabsContainer = document.getElementById('tabs-container');
    projectsData.forEach((project, index) => {
        const button = document.createElement('button');
        button.id = `tab-btn-${project.id}`;
        button.setAttribute('data-tab', project.id);
        button.className = `nav-tab ${project.id === 1 ? 'active-tab' : ''}`;
        button.textContent = `${project.id}. ${project.title.split(' ')[0]} ${project.title.split(' ')[1] || ''}`;
        
        button.addEventListener('click', () => {
            document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active-tab'));
            button.classList.add('active-tab');
            currentTab = project.id;
            renderProject(project.id);
        });
        
        tabsContainer.appendChild(button);
    });
}

function renderProject(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const container = document.getElementById('content-container');
    container.innerHTML = '';
    
    const section = document.createElement('section');
    section.className = 'project-content';
    
    section.innerHTML = `
        <h2>${project.title}</h2>
        <h3>${project.subtitle}</h3>
        
        <p class="text-sm text-slate-500 mb-4">
            <span class="font-medium">프로젝트 기간:</span> ${project.period}
        </p>

        <h4>🛠️ 사용 기술 ${project.id === 3 ? '' : '스택'}</h4>
        <div>
            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>

        ${renderProjectContent(project)}
    `;
    
    container.appendChild(section);
}

function renderProjectContent(project) {
    if (project.id === 1) {
        return `
            <h4>🚀 주요 활동 및 문제 해결 경험</h4>
            <ol class="project-section-list list-decimal list-inside text-slate-700 space-y-4">
                ${project.activities.map(activity => `
                    <li>
                        <strong>${activity.title}</strong>
                        <ul class="mt-2">
                            ${activity.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </li>
                `).join('')}
            </ol>

            <h4>📊 프로젝트 핵심 성과</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                ${project.stats.map(stat => `
                    <div class="stat-card">
                        <div class="stat-value">${stat.value}</div>
                        <div class="stat-label">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
            <ul>
                ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        `;
    } else if (project.id === 2) {
        return `
            <h4>📜 주요 구현 내용 (3-Parts)</h4>
            <ol class="project-section-list list-decimal list-inside text-slate-700 space-y-4">
                ${project.parts.map(part => `
                    <li>
                        <div class="part-title">${part.title}</div>
                        <div class="part-desc">${part.desc}</div>
                        <ul class="list-disc list-inside ml-4">
                            ${part.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </li>
                `).join('')}
            </ol>

            <h4>💡 문제 해결 및 성과</h4>
            <ul>
                ${project.problemSolving.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
    } else if (project.id === 3) {
        return `
            <h4>📜 주요 구현 내용</h4>
            <ul>
                ${project.implementations.map(impl => `<li>${impl}</li>`).join('')}
            </ul>

            <h4>💡 문제 해결 및 성과</h4>
            <ul>
                ${project.problemSolving.map(item => `<li>${item}</li>`).join('')}
            </ul>

            <h4>🧠 AI 시대와 Prolog에 대한 고찰</h4>
            <div class="reflection-box">
                ${project.reflection.sections.map(section => `
                    <h5>${section.title}</h5>
                    ${section.content ? `<p class="mb-3">${section.content}</p>` : ''}
                    ${section.list ? `
                        <ul class="list-disc list-inside ${section.content2 ? 'mb-3' : ''} space-y-2">
                            ${section.list.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${section.content2 ? `<p class="mb-3">${section.content2}</p>` : ''}
                    ${section.conclusion ? `<p class="mt-4 font-medium">${section.conclusion}</p>` : ''}
                `).join('')}
            </div>
        `;
    }
}
