// Initialize routine groups and items
const routineData = [
    {
        title: "Meals",
        column: 1,
        items: [
            { type: "task", label: "Breakfast", checked: false },
            { type: "task", label: "Lunch", checked: false },
            { type: "task", label: "Dinner", checked: false },
            { type: "task", label: "Take meat from freezer", checked: false },
        ]
    },
    {
        title: "Mental Activities",
        column: 1,
        items: [
            { type: "task", label: "Reading", checked: false },
            { type: "task", label: "Mental arithmetic", checked: false },
            { type: "task", label: "Math", checked: false },
            { type: "task", label: "Chess game", checked: false },
        ]
    },
    {
        title: "Physical Activities",
        column: 1,
        items: [
            { type: "task", label: "Training", checked: false },
        ]
    },
    {
        title: "Productivity",
        column: 1,
        items: [
            { type: "task", label: "Studying", checked: false },
            { type: "task", label: "Programming", checked: false },
        ]
    },
    {
        title: "Personal Care",
        column: 2,
        items: [
            { type: "task", label: "Take a shower", checked: false },
            { type: "task", label: "Wash hair", checked: false},
            { type: "task", label: "Shave", checked: false},
            { type: "task", label: "Look at sun (5min)", checked: false }
        ]
    },
    {
        title: "Home Care",
        column: 2,
        items: [
            { type: "task", label: "Air out room", checked: false },
            { type: "task", label: "Clean room", checked: false }
        ]
    },
    {
        title: "Habits",
        column: 2,
        items: [
            { type: "task", label: "No cigarettes", checked: false },
            { type: "task", label: "No alcohol", checked: false },
            { type: "task", label: "Nofap", checked: false }
        ]
    },
    {
        title: "For General Knowledge",
        column: 2,
        items: [
            { type: "task", label: "Post for channel", checked: false },
            { type: "task", label: "Random Wiki", checked: false },
            { type: "task", label: "Random Lurk", checked: false },
            { type: "task", label: "Random Poem", checked: false },
        ]
    }
];

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
    
    const options = { month: 'short', day: 'numeric', weekday: 'short' };
    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = dateString;
    
    if (hours === '00' && minutes === '00' && seconds === '00') {
        resetRoutineData();
    }
}

// Function to render routine groups and items
function renderRoutineGroups() {
    const column1 = document.getElementById('routine-column-1');
    const column2 = document.getElementById('routine-column-2');
    
    column1.innerHTML = '';
    column2.innerHTML = '';
    
    routineData.forEach((group, groupIndex) => {
        const groupElement = document.createElement('div');
        groupElement.className = 'routine-group';
        
        const groupTitle = document.createElement('div');
        groupTitle.className = 'group-title';
        groupTitle.textContent = group.title;
        groupElement.appendChild(groupTitle);
        
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'routine-items';
        
        group.items.forEach((item, itemIndex) => {
            if (item.type === 'task') {
                const routineItem = document.createElement('div');
                routineItem.className = 'routine-item';
                if (item.isSubItem) {
                    routineItem.classList.add('sub-item');
                }
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'routine-checkbox';
                checkbox.id = `routine-${groupIndex}-${itemIndex}`;
                checkbox.checked = item.checked;
                
                const label = document.createElement('label');
                label.className = 'routine-label';
                label.htmlFor = `routine-${groupIndex}-${itemIndex}`;
                label.textContent = item.label;
                
                if (item.checked) {
                    label.classList.add('completed');
                }
                
                checkbox.addEventListener('change', () => {
                    item.checked = checkbox.checked;
                    if (checkbox.checked) {
                        label.classList.add('completed');
                    } else {
                        label.classList.remove('completed');
                    }
                });
                
                routineItem.appendChild(checkbox);
                routineItem.appendChild(label);
                itemsContainer.appendChild(routineItem);
            } else if (item.type === 'number' || item.type === 'text') {
                const routineItem = document.createElement('div');
                routineItem.className = 'routine-item';
                
                const label = document.createElement('div');
                label.className = 'routine-label';
                label.textContent = item.label + ':';
                
                const input = document.createElement('input');
                input.type = item.type === 'number' ? 'number' : 'text';
                input.className = item.type === 'text' ? 'input-field long' : 'input-field';
                input.placeholder = item.placeholder || '';
                input.value = item.value;
                
                input.addEventListener('change', () => {
                    item.value = input.value;
                });
                
                if (item.type === 'text') {
                    routineItem.appendChild(label);
                    itemsContainer.appendChild(routineItem);
                    itemsContainer.appendChild(input);
                } else {
                    routineItem.appendChild(label);
                    routineItem.appendChild(input);
                    itemsContainer.appendChild(routineItem);
                }
            } else if (item.type === 'select') {
                const routineItem = document.createElement('div');
                routineItem.className = 'routine-item';
                
                const label = document.createElement('div');
                label.className = 'routine-label';
                label.textContent = item.label + ':';
                
                const select = document.createElement('select');
                select.className = 'input-field';
                
                item.options.forEach(optionText => {
                    const option = document.createElement('option');
                    option.value = optionText;
                    option.textContent = optionText || 'Select...';
                    select.appendChild(option);
                });
                
                select.value = item.value;
                
                select.addEventListener('change', () => {
                    item.value = select.value;
                });
                
                routineItem.appendChild(label);
                routineItem.appendChild(select);
                itemsContainer.appendChild(routineItem);
            }
        });
        
        groupElement.appendChild(itemsContainer);
        
        if (group.column === 1) {
            column1.appendChild(groupElement);
        } else {
            column2.appendChild(groupElement);
        }
    });
}

// Function to save all routine data to localStorage
function saveAllData() {
    try {
        localStorage.setItem('currentRoutineData', JSON.stringify(routineData));
        localStorage.setItem('telegramConfig', JSON.stringify(telegramConfig));
        showToast("Data saved successfully!");
    } catch (error) {
        console.error('Error saving data:', error);
        showToast("Error saving data!", true);
    }
}

// Function to load all data, including Telegram configuration
function loadAllData() {
    try {
        const savedData = localStorage.getItem('currentRoutineData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            updateRoutineDataFromSaved(parsedData);
            console.log('Loaded routine data from localStorage');
        }
        
        const savedTelegramConfig = localStorage.getItem('telegramConfig');
        if (savedTelegramConfig) {
            telegramConfig = JSON.parse(savedTelegramConfig);
            updateTelegramForm();
            console.log('Loaded Telegram config from localStorage');
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Function to load routine data from localStorage
function loadRoutineData() {
    try {
        const savedData = localStorage.getItem('currentRoutineData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            updateRoutineDataFromSaved(parsedData);
            console.log('Loaded data from localStorage');
        }
    } catch (error) {
        console.error('Error loading routine data:', error);
    }
}

// Helper function to update routineData from saved data
function updateRoutineDataFromSaved(savedData) {
    savedData.forEach((savedGroup, groupIndex) => {
        if (groupIndex < routineData.length) {
            savedGroup.items.forEach((savedItem, itemIndex) => {
                if (itemIndex < routineData[groupIndex].items.length) {
                    routineData[groupIndex].items[itemIndex].checked = savedItem.checked;
                    routineData[groupIndex].items[itemIndex].value = savedItem.value;
                }
            });
        }
    });
}

// Function to reset all checkboxes
function resetCheckboxes() {
    try {
        routineData.forEach(group => {
            group.items.forEach(item => {
                if (item.type === 'task') {
                    item.checked = false;
                }
            });
        });
        renderRoutineGroups();
        showToast("All checkboxes reset!");
    } catch (error) {
        console.error('Error resetting checkboxes:', error);
        showToast("Error resetting checkboxes!", true);
    }
}

// Function to reset routine data for a new day
function resetRoutineData() {
    try {
        saveAllData();
        
        routineData.forEach(group => {
            group.items.forEach(item => {
                if (item.type === 'task') {
                    item.checked = false;
                } else {
                    item.value = '';
                }
            });
        });
        
        saveAllData();
        
        renderRoutineGroups();
        console.log('Reset routine data for new day');
    } catch (error) {
        console.error('Error resetting routine data:', error);
    }
}

// Handle tab switching
function handleTabSwitch() {
    const tabs = document.querySelectorAll('.routine-tab');
    const views = [
        document.getElementById('today-view'),
        document.getElementById('day-view')
    ];
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            
            tab.classList.add('active');
            
            views.forEach(view => {
                view.style.display = 'none';
            });
            
            const selectedTab = tab.getAttribute('data-tab');
            document.getElementById(`${selectedTab}-view`).style.display = 'flex';
        });
    });
}

// Show toast notification
function showToast(message, isError = false) {
    const toast = document.getElementById('toast-notification');
    toast.textContent = message;
    
    if (isError) {
        toast.style.backgroundColor = '#f44336';
    } else {
        toast.style.backgroundColor = 'var(--accent-color)';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Telegram configuration
let telegramConfig = {
    token: '',
    channelId: ''
};

// Function to format Telegram message
function getFormattedMessage() {
    const now = new Date();
    const dateString = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}, ${now.toLocaleString('ru-RU', { weekday: 'long' })}`;
    
    let emojis = [];
    
    // Check Mental Activities (all tasks must be checked)
    const mentalActivities = routineData.find(group => group.title === "Mental Activities");
    if (mentalActivities && mentalActivities.items.every(item => item.checked)) {
        emojis.push('🧠');
    }
    
    // Check individual tasks
    if (routineData.find(group => group.title === "Mental Activities")?.items.find(item => item.label === "Chess game")?.checked) {
        emojis.push('♟');
    }
    if (routineData.find(group => group.title === "Mental Activities")?.items.find(item => item.label === "Reading")?.checked) {
        emojis.push('📖');
    }
    if (routineData.find(group => group.title === "Physical Activities")?.items.find(item => item.label === "Training")?.checked) {
        emojis.push('🏋️‍♂️');
    }
    
    // Check Personal Care tasks
    const personalCare = routineData.find(group => group.title === "Personal Care");
    if (personalCare && ['Shave', 'Wash hair', 'Take a shower'].every(task => 
        personalCare.items.find(item => item.label === task)?.checked)) {
        emojis.push('🛁');
    }
    
    // Check Home Care (all tasks must be checked)
    const homeCare = routineData.find(group => group.title === "Home Care");
    if (homeCare && homeCare.items.every(item => item.checked)) {
        emojis.push('🧹');
    }
    
    // Check Habits
    if (routineData.find(group => group.title === "Habits")?.items.find(item => item.label === "No cigarettes")?.checked) {
        emojis.push('🚭');
    }
    
    // Check For General Knowledge
    const generalKnowledge = routineData.find(group => group.title === "For General Knowledge");
    if (generalKnowledge && ['Random Wiki', 'Random Lurk'].every(task => 
        generalKnowledge.items.find(item => item.label === task)?.checked)) {
        emojis.push('🔍');
    }
    if (generalKnowledge?.items.find(item => item.label === "Random Poem")?.checked) {
        emojis.push('📜');
    }
    
    // Check Productivity
    if (routineData.find(group => group.title === "Productivity")?.items.find(item => item.label === "Programming")?.checked) {
        emojis.push('💻');
    }
    
    // Calculate total calories (assuming 0 for now as no calorie input)
    const calories = 0;
    
    return `${dateString}\n${emojis.join(' ')}\n🍽 ${calories} cal`;
}

// Function to send data to Telegram
function sendDataToTelegram() {
    if (!telegramConfig.token || !telegramConfig.channelId) {
        console.error('Telegram configuration is incomplete');
        showToast("Please configure Telegram settings.", true);
        return;
    }
    
    const message = getFormattedMessage();
    const url = `https://api.telegram.org/bot${telegramConfig.token}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: telegramConfig.channelId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Message sent to Telegram successfully');
            showToast('Report sent to Telegram!');
        } else {
            console.error('Failed to send message to Telegram:', data);
            showToast('Failed to send to Telegram!', true);
        }
    })
    .catch(error => {
        console.error('Error sending message to Telegram:', error);
        showToast('Error sending to Telegram!', true);
    });
}

// Function to update Telegram form
function updateTelegramForm() {
    const tokenInput = document.getElementById('telegram-token');
    const channelInput = document.getElementById('telegram-channel');
    
    if (tokenInput && channelInput) {
        tokenInput.value = telegramConfig.token || '';
        channelInput.value = telegramConfig.channelId || '';
    }
}

// Function to save Telegram settings
function saveTelegramSettings() {
    const tokenInput = document.getElementById('telegram-token');
    const channelInput = document.getElementById('telegram-channel');
    
    telegramConfig.token = tokenInput.value.trim();
    telegramConfig.channelId = channelInput.value.trim();
    
    saveAllData();
    
    if (telegramConfig.token && telegramConfig.channelId) {
        showToast("Telegram settings saved!");
    } else {
        showToast("Please fill in all Telegram settings.", true);
    }
    
    hideTelegramModal();
}

// Function to show Telegram modal
function showTelegramModal() {
    const modal = document.getElementById('telegram-modal');
    modal.classList.add('active');
    updateTelegramForm();
}

// Function to hide Telegram modal
function hideTelegramModal() {
    const modal = document.getElementById('telegram-modal');
    modal.classList.remove('active');
}

// Function to initialize the app
function initApp() {
    try {
        loadAllData();
        renderRoutineGroups();
        
        updateDateTime();
        setInterval(updateDateTime, 1000);
        
        document.getElementById('save-button').addEventListener('click', saveAllData);
        document.getElementById('telegram-setup').addEventListener('click', showTelegramModal);
        document.getElementById('send-now').addEventListener('click', sendDataToTelegram);
        document.getElementById('reset-button').addEventListener('click', resetCheckboxes);
        
        document.getElementById('telegram-save').addEventListener('click', saveTelegramSettings);
        document.getElementById('telegram-cancel').addEventListener('click', hideTelegramModal);
        
        handleTabSwitch();
        
        console.log('Application initialized');
    } catch (error) {
        console.error('Error initializing app:', error);
        showToast('Error initializing application', true);
    }
}

// Run the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);