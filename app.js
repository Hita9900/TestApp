
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
export async function saveData(title, content) {
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

/*
//service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js') 
    .then(() => console.log('Service Worker Registered!'));
}*/