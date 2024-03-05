// Code for enforcing checkbox limits
document.addEventListener('DOMContentLoaded', function() {
    function enforceCheckboxLimit(groupName, limit) {
        const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${groupName}"]`);
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                const checkedCheckboxes = document.querySelectorAll(`input[type="checkbox"][name="${groupName}"]:checked`);
                if (checkedCheckboxes.length > limit) {
                    alert(`Only ${limit} selections are allowed for ${groupName}.`);
                    checkbox.checked = false;
                }
            });
        });
    }

    // Apply the limit to each group of checkboxes
    enforceCheckboxLimit('head', 2);
    enforceCheckboxLimit('eyecolor', 2);
    enforceCheckboxLimit('noseshape', 2);
    enforceCheckboxLimit('lip', 2);
    enforceCheckboxLimit('ears', 2);

    // Submit button click event
    document.getElementById('submit-button').addEventListener('click', function() {
        const selectedAttributes = {};
        const resultsList = document.getElementById('gene-result');
        resultsList.innerHTML = ''; // Clear previous results
    
        ['head', 'eyecolor', 'noseshape', 'lip', 'ears'].forEach(function(groupName) {
            const selected = document.querySelectorAll(`input[type="checkbox"][name="${groupName}"]:checked`);
            if (selected.length > 0) {
                const randomIndex = Math.floor(Math.random() * selected.length);
                selectedAttributes[groupName] = selected[randomIndex].id;
                
                const listItem = document.createElement('li');
                listItem.textContent = `${groupName.toUpperCase()}: ${selected[randomIndex].id}`;
                resultsList.appendChild(listItem);
            }
        });
    
        console.log(selectedAttributes);
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});
