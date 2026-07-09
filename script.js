let projectsData = null;

document.addEventListener('DOMContentLoaded', async () => {
    await loadProjects();
    loadProject(1);
    setupTabs();
    setupAllImageToggles();
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

function setupTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.project-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = parseInt(tab.getAttribute('data-tab'));

            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');

            contents.forEach(content => {
                content.classList.add('hidden');
            });

            document.getElementById(`content-${tabId}`).classList.remove('hidden');
            loadProject(tabId);
        });
    });
}

function loadProject(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    resetAllImageToggles();

    if (projectId === 1) {
        loadProject1(project);
    } else if (projectId === 2) {
        loadProject2(project);
    } else if (projectId === 3) {
        loadProject3(project);
    }
}

function loadProject1(project) {
    document.getElementById('project1-title').textContent = project.title;
    document.getElementById('project1-subtitle').textContent = project.subtitle;
    document.getElementById('project1-period').textContent = project.period;

    const techstackContainer = document.getElementById('project1-techstack');
    techstackContainer.innerHTML = project.techStack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    document.getElementById('activity1-title').textContent = project.activities[0].title;
    document.getElementById('activity1-problem').textContent = project.activities[0].problem;
    document.getElementById('activity1-solution').textContent = project.activities[0].solution;

    document.getElementById('activity2-title').textContent = project.activities[1].title;
    document.getElementById('activity2-goal').textContent = project.activities[1].goal;
    const processContainer = document.getElementById('activity2-process');
    processContainer.innerHTML = project.activities[1].process.map(item => 
        `<li>${item}</li>`
    ).join('');
    document.getElementById('activity2-performance').textContent = project.activities[1].performance;
    document.getElementById('activity2-result').textContent = project.activities[1].result;

    document.getElementById('activity3-title').textContent = project.activities[2].title;
    document.getElementById('activity3-problem').textContent = project.activities[2].problem;
    document.getElementById('activity3-hypothesis').textContent = project.activities[2].hypothesis;
    document.getElementById('activity3-attempt').textContent = project.activities[2].attempt;
    document.getElementById('activity3-conclusion').textContent = project.activities[2].conclusion;

    document.getElementById('activity4-title').textContent = project.activities[3].title;
    document.getElementById('activity4-problem').textContent = project.activities[3].problem;
    document.getElementById('activity4-retry').textContent = project.activities[3].retry;
    document.getElementById('activity4-result').textContent = project.activities[3].result;
    document.getElementById('activity4-conclusion').textContent = project.activities[3].conclusion;

    document.getElementById('stat1-value').textContent = project.stats[0].value;
    document.getElementById('stat1-label').textContent = project.stats[0].label;
    document.getElementById('stat2-value').textContent = project.stats[1].value;
    document.getElementById('stat2-label').textContent = project.stats[1].label;

    document.getElementById('achievement1-title').textContent = project.achievements[0].title;
    document.getElementById('achievement1-content').textContent = project.achievements[0].content;
    document.getElementById('achievement2-title').textContent = project.achievements[1].title;
    document.getElementById('achievement2-content').textContent = project.achievements[1].content;
    document.getElementById('achievement3-title').textContent = project.achievements[2].title;
    document.getElementById('achievement3-item1-subtitle').textContent = project.achievements[2].items[0].subtitle;
    document.getElementById('achievement3-item1-content').textContent = project.achievements[2].items[0].content;
    document.getElementById('achievement3-item2-subtitle').textContent = project.achievements[2].items[1].subtitle;
    document.getElementById('achievement3-item2-content').textContent = project.achievements[2].items[1].content;

}

function setupAllImageToggles() {
    setupImageToggle('toggle-cassandra-img', 'cassandra-img-container', '그래프 보기', '그래프 숨기기');
    setupImageToggle('toggle-mongodb-img', 'mongodb-img-container', '스키마 비교 보기', '스키마 비교 숨기기');
    setupImageToggle('toggle-mysql-img', 'mysql-img-container', '그래프 보기', '그래프 숨기기');
    setupImageToggle('toggle-rdbms-img', 'rdbms-img-container', '그래프 보기', '그래프 숨기기');
    setupImageToggle('toggle-part1-img', 'part1-img-container', '구현 사진 보기', '구현 사진 숨기기');
    setupImageToggle('toggle-part2-img', 'part2-img-container', '구현 사진 보기', '구현 사진 숨기기');
    setupImageToggle('toggle-p3-platform-img', 'p3-platform-img-container', '플랫폼 화면 보기', '플랫폼 화면 숨기기');
    setupImageToggle('toggle-p3-schema-img', 'p3-schema-img-container', '방대한 블록·파라미터 데이터 보기', '방대한 블록·파라미터 데이터 숨기기');
    setupImageToggle('toggle-p3-frontend-img', 'p3-frontend-img-container', 'Diff 비교 화면 보기', 'Diff 비교 화면 숨기기');
    setupImageToggle('toggle-p3-security-img', 'p3-security-img-container', 'API Key 관리 화면 보기', 'API Key 관리 화면 숨기기');
    setupImageToggle('toggle-p3-usage-img', 'p3-usage-img-container', '실행 화면 보기', '실행 화면 숨기기');
}

function resetAllImageToggles() {
    const toggleConfigs = [
        { buttonId: 'toggle-cassandra-img', containerId: 'cassandra-img-container', showText: '그래프 보기' },
        { buttonId: 'toggle-mongodb-img', containerId: 'mongodb-img-container', showText: '스키마 비교 보기' },
        { buttonId: 'toggle-mysql-img', containerId: 'mysql-img-container', showText: '그래프 보기' },
        { buttonId: 'toggle-rdbms-img', containerId: 'rdbms-img-container', showText: '그래프 보기' },
        { buttonId: 'toggle-part1-img', containerId: 'part1-img-container', showText: '구현 사진 보기' },
        { buttonId: 'toggle-part2-img', containerId: 'part2-img-container', showText: '구현 사진 보기' },
        { buttonId: 'toggle-p3-platform-img', containerId: 'p3-platform-img-container', showText: '플랫폼 화면 보기' },
        { buttonId: 'toggle-p3-schema-img', containerId: 'p3-schema-img-container', showText: '방대한 블록·파라미터 데이터 보기' },
        { buttonId: 'toggle-p3-frontend-img', containerId: 'p3-frontend-img-container', showText: 'Diff 비교 화면 보기' },
        { buttonId: 'toggle-p3-security-img', containerId: 'p3-security-img-container', showText: 'API Key 관리 화면 보기' },
        { buttonId: 'toggle-p3-usage-img', containerId: 'p3-usage-img-container', showText: '실행 화면 보기' }
    ];

    toggleConfigs.forEach(config => {
        const button = document.getElementById(config.buttonId);
        const container = document.getElementById(config.containerId);
        
        if (button && container) {
            container.classList.add('hidden');
            button.textContent = config.showText;
        }
    });
}

function setupImageToggle(buttonId, containerId, showText, hideText) {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(containerId);
    
    if (button && container) {
        button.addEventListener('click', () => {
            container.classList.toggle('hidden');
            if (container.classList.contains('hidden')) {
                button.textContent = showText;
            } else {
                button.textContent = hideText;
            }
        });
    }
}

function loadProject2(project) {
    document.getElementById('project2-title').textContent = project.title;
    document.getElementById('project2-subtitle').textContent = project.subtitle;
    document.getElementById('project2-period').textContent = project.period;

    const techstackContainer = document.getElementById('project2-techstack');
    techstackContainer.innerHTML = project.techStack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    document.getElementById('part1-title').textContent = project.parts[0].title;
    document.getElementById('part1-desc').textContent = project.parts[0].desc;
    const part1Items = document.getElementById('part1-items');
    part1Items.innerHTML = project.parts[0].items.map(item => `<li>${item}</li>`).join('');

    document.getElementById('part2-title').textContent = project.parts[1].title;
    document.getElementById('part2-desc').textContent = project.parts[1].desc;
    document.getElementById('part2-rdt-title').textContent = project.parts[1].rdtTitle;
    document.getElementById('rdt1-subtitle').textContent = project.parts[1].rdtItems[0].subtitle;
    document.getElementById('rdt1-content').textContent = project.parts[1].rdtItems[0].content;
    document.getElementById('rdt2-subtitle').textContent = project.parts[1].rdtItems[1].subtitle;
    document.getElementById('rdt2-content').textContent = project.parts[1].rdtItems[1].content;
    document.getElementById('rdt3-subtitle').textContent = project.parts[1].rdtItems[2].subtitle;
    document.getElementById('rdt3-content').textContent = project.parts[1].rdtItems[2].content;
    document.getElementById('part2-result').textContent = project.parts[1].result;

    document.getElementById('part3-title').textContent = project.parts[2].title;
    document.getElementById('part3-desc').textContent = project.parts[2].desc;
    document.getElementById('part3-arp').textContent = project.parts[2].arpScanner;
    document.getElementById('part3-mobility-title').textContent = project.parts[2].mobilityTitle;
    document.getElementById('mobility1-case').textContent = project.parts[2].mobilityItems[0].case;
    document.getElementById('mobility1-content').textContent = project.parts[2].mobilityItems[0].content;
    document.getElementById('mobility2-case').textContent = project.parts[2].mobilityItems[1].case;
    document.getElementById('mobility2-content').textContent = project.parts[2].mobilityItems[1].content;

    const implementationsContainer = document.getElementById('project2-implementations');
    implementationsContainer.innerHTML = project.summary.implementations.map(item =>
        `<li>${item}</li>`
    ).join('');
    document.getElementById('project2-achievement').textContent = project.summary.achievement;
}

function loadProject3(project) {
    document.getElementById('project3-title').textContent = project.title;
    document.getElementById('project3-subtitle').textContent = project.subtitle;
    document.getElementById('project3-period').textContent = project.period;

    const techstackContainer = document.getElementById('project3-techstack');
    techstackContainer.innerHTML = project.techStack.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    document.getElementById('p3-bg-intro').textContent = project.background.intro;
    project.background.problems.forEach((problem, i) => {
        document.getElementById(`p3-problem${i + 1}-title`).textContent = problem.title;
        document.getElementById(`p3-problem${i + 1}-content`).textContent = problem.content;
    });

    project.phases.forEach((phase, i) => {
        const n = i + 1;
        document.getElementById(`p3-phase${n}-title`).textContent = `${phase.label} | ${phase.title}`;
        document.getElementById(`p3-phase${n}-approach`).innerHTML = phase.approach.map(item => `<li>${item}</li>`).join('');
        document.getElementById(`p3-phase${n}-achieved`).innerHTML = phase.achieved.map(item => `<li>${item}</li>`).join('');
        const limitationEl = document.getElementById(`p3-phase${n}-limitation`);
        if (limitationEl) {
            const limitationParent = limitationEl.closest('li');
            if (phase.limitation && phase.limitation.length > 0) {
                limitationEl.innerHTML = phase.limitation.map(item => `<li>${item}</li>`).join('');
            } else if (limitationParent) {
                limitationParent.classList.add('hidden');
            }
        }
        document.getElementById(`p3-phase${n}-conclusion`).textContent = phase.conclusion;
    });

    document.getElementById('p3-phasestat1-value').textContent = project.phaseStats[0].value;
    document.getElementById('p3-phasestat1-label').textContent = project.phaseStats[0].label;
    document.getElementById('p3-phasestat2-value').textContent = project.phaseStats[1].value;
    document.getElementById('p3-phasestat2-label').textContent = project.phaseStats[1].label;

    document.getElementById('p3-arch-intro').textContent = project.architecture.intro;
    const archStepsContainer = document.getElementById('p3-arch-steps');
    archStepsContainer.innerHTML = project.architecture.steps.map(step =>
        `<li><strong>${step.title}</strong> — ${step.desc}</li>`
    ).join('');
    const archPrinciplesContainer = document.getElementById('p3-arch-principles');
    archPrinciplesContainer.innerHTML = project.architecture.principles.map(item =>
        `<li>${item}</li>`
    ).join('');

    document.getElementById('p3-frontend-intro').textContent = project.frontend.intro;
    project.frontend.items.forEach((item, i) => {
        document.getElementById(`p3-frontend${i + 1}-title`).textContent = item.title;
        document.getElementById(`p3-frontend${i + 1}-content`).textContent = item.content;
    });
    document.getElementById('p3-frontend-technote').textContent = project.frontend.techNote;

    document.getElementById('p3-security-intro').textContent = project.security.intro;
    project.security.items.forEach((item, i) => {
        document.getElementById(`p3-security${i + 1}-title`).textContent = item.title;
        document.getElementById(`p3-security${i + 1}-content`).textContent = item.content;
    });

    document.getElementById('p3-usage-title').textContent = project.usage.title;
    document.getElementById('p3-usage-command').textContent = project.usage.command;
    document.getElementById('p3-usage-description').textContent = project.usage.description;

    document.getElementById('p3-stat1-value').textContent = project.stats[0].value;
    document.getElementById('p3-stat1-label').textContent = project.stats[0].label;
    document.getElementById('p3-stat2-value').textContent = project.stats[1].value;
    document.getElementById('p3-stat2-label').textContent = project.stats[1].label;

    project.achievements.forEach((achievement, i) => {
        document.getElementById(`p3-achievement${i + 1}-title`).textContent = achievement.title;
        document.getElementById(`p3-achievement${i + 1}-content`).textContent = achievement.content;
    });
}
