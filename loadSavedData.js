// Load data when dashboard opens
document.addEventListener('DOMContentLoaded', async () => {
const data = await fetchUserData();
const dataList = document.getElementById('data-list');
        
if (data.length === 0) {
    dataList.innerHTML = '<p>No data saved yet.</p>';
    } else {
        let html = '';
        data.forEach(item => {
            html += `
                <div class="data-item">
                    <h3>${item.title}</h3>
                    <p>${item.content}</p>
                </div>
                `;
            });
        dataList.innerHTML = html;
    }
});