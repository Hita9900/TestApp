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


//fetchUserData
async function fetchUserData() {
    const user = supabaseClient.auth.user();
    
    const { data, error } = await supabaseClient
        .from('user_data')
        .select('*')
        .eq('user_id', user.id);
    
    if (error) {
        console.error('Error fetching data:', error);
    } else {
        console.log('User data:', data);
        return data;
    }
}