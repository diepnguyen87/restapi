
        
        async function GetData() {
            let endpoint = 'https://jsonplaceholder.typicode.com/users';
            const request = await fetch(endpoint, { method: "GET" });
            const response = await request.json();
            
            console.log(request.status)
            }
            
            GetData() // call the function
            
        