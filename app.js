
const supabaseUrl = 'https://zxoejcljodfirstxadkl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4b2VqY2xqb2RmaXJzdHhhZGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNDAwMTUsImV4cCI6MjA2NjcxNjAxNX0.s-YFL42yB5smxiWTBDzNUZX8ZQ861wy6DrLjoPwfpvo';
// Initialize Supabase
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
console.log("test 2: Supabase is:", typeof supabase); 


// Login function
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    let { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert(error.message);
    } else {
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }
}

// Signup function
async function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    let { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });
    
    document.getElementById('login-password').value = "";

    if (error) {
        alert(error.message);
    } else {
        alert('Check your email for confirmation!');
    }
}

//saveData
async function saveData(title, content) {
    const user = supabaseClient.auth.user();
    
    const { data, error } = await supabaseClient
        .from('user_data')
        .insert([
            { 
                user_id: user.id, 
                title: title,
                content: content 
            }
        ]);
    
    if (error) {
        console.error('Error saving data:', error);
    } else {
        console.log('Data saved successfully!');
    }
}

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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('user_data')
        .select('*')
        .eq('user_id', user.id);

    if (error) throw error;
    return data;
}

/*
//service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js') 
    .then(() => console.log('Service Worker Registered!'));
}*/