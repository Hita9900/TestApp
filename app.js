console.log("test 1: Supabase is:", typeof supabase); 
const supabaseUrl = 'https://zxoejcljodfirstxadkl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4b2VqY2xqb2RmaXJzdHhhZGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNDAwMTUsImV4cCI6MjA2NjcxNjAxNX0.s-YFL42yB5smxiWTBDzNUZX8ZQ861wy6DrLjoPwfpvo';
// Initialize Supabase
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
console.log("test 2: Supabase is:", typeof supabase); 


// Login function
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const { data, error } = await supabase.auth.signInWithPassword({
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
    
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });
    
    if (error) {
        alert(error.message);
    } else {
        alert('Check your email for confirmation!');
    }
}

//saveData
async function saveData(title, content) {
    const user = supabase.auth.user();
    
    const { data, error } = await supabase
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

//fetchUserData
async function fetchUserData() {
    const user = supabase.auth.user();
    
    const { data, error } = await supabase
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


///submit data
async function saveData(event) {
  event.preventDefault();
  const title = document.getElementById('data-title').value;
  const content = document.getElementById('data-content').value;
  
  const { error } = await supabase
    .from('user_data')
    .insert([{ title, content }]); // Auto-fills user_id via RLS
  
  if (error) alert("Error saving data!");
  else alert("Saved successfully!");
}