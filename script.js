let projectsData = null;

document.addEventListener('DOMContentLoaded', async () => {
    await loadProjects();
    loadProject(1);
    setupTabs();
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
    document.getElementById('achievement2-item1-subtitle').textContent = project.achievements[1].items[0].subtitle;
    document.getElementById('achievement2-item1-content').textContent = project.achievements[1].items[0].content;
    document.getElementById('achievement2-item2-subtitle').textContent = project.achievements[1].items[1].subtitle;
    document.getElementById('achievement2-item2-content').textContent = project.achievements[1].items[1].content;

    setupImageToggle('toggle-rdbms-img', 'rdbms-img-container');
}

function setupImageToggle(buttonId, containerId) {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(containerId);
    
    if (button && container) {
        button.addEventListener('click', () => {
            container.classList.toggle('hidden');
            if (container.classList.contains('hidden')) {
                button.textContent = '📊 비교 그래프 보기';
            } else {
                button.textContent = '📊 비교 그래프 숨기기';
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

    document.getElementById('project2-problem').textContent = project.problemSolving.problem;
    document.getElementById('project2-solution').textContent = project.problemSolving.solution;
    document.getElementById('project2-achievement').textContent = project.problemSolving.achievement;
}

function loadProject3(project) {
    document.getElementById('project3-title').textContent = project.title;
    document.getElementById('project3-subtitle').textContent = project.subtitle;
    document.getElementById('project3-period').textContent = project.period;

    const techstackContainer = document.getElementById('project3-techstack');
    techstackContainer.innerHTML = project.techStack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    document.getElementById('impl1-title').textContent = project.implementations[0].title;
    document.getElementById('impl1-content').textContent = project.implementations[0].content;
    document.getElementById('impl2-title').textContent = project.implementations[1].title;
    document.getElementById('impl2-content').textContent = project.implementations[1].content;
    document.getElementById('impl3-title').textContent = project.implementations[2].title;
    document.getElementById('impl3-content').textContent = project.implementations[2].content;
    document.getElementById('impl4-title').textContent = project.implementations[3].title;
    document.getElementById('impl4-content').textContent = project.implementations[3].content;

    document.getElementById('project3-problem').textContent = project.problemSolving.problem;
    document.getElementById('project3-solution').textContent = project.problemSolving.solution;
    document.getElementById('project3-achievement').textContent = project.problemSolving.achievement;

    document.getElementById('reflection1-title').textContent = project.reflection.feature.title;
    document.getElementById('reflection1-content').textContent = project.reflection.feature.content;

    document.getElementById('reflection2-title').textContent = project.reflection.aiRole.title;
    document.getElementById('reflection2-intro').textContent = project.reflection.aiRole.intro;
    document.getElementById('aitype1-type').textContent = project.reflection.aiRole.aiTypes[0].type;
    document.getElementById('aitype1-desc').textContent = project.reflection.aiRole.aiTypes[0].desc;
    document.getElementById('aitype2-type').textContent = project.reflection.aiRole.aiTypes[1].type;
    document.getElementById('aitype2-desc').textContent = project.reflection.aiRole.aiTypes[1].desc;
    document.getElementById('reflection2-combined').textContent = project.reflection.aiRole.combined;

    document.getElementById('reflection3-title').textContent = project.reflection.potentialRoles.title;
    document.getElementById('role1-title').textContent = project.reflection.potentialRoles.items[0].role;
    document.getElementById('role1-desc').textContent = project.reflection.potentialRoles.items[0].desc;
    document.getElementById('role2-title').textContent = project.reflection.potentialRoles.items[1].role;
    document.getElementById('role2-desc').textContent = project.reflection.potentialRoles.items[1].desc;
    document.getElementById('role3-title').textContent = project.reflection.potentialRoles.items[2].role;
    document.getElementById('role3-desc').textContent = project.reflection.potentialRoles.items[2].desc;
    document.getElementById('reflection-conclusion').textContent = project.reflection.potentialRoles.conclusion;
}
