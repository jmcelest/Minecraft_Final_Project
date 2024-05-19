const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://sasqxauusupdslvfcziq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc3F4YXV1c3VwZHNsdmZjemlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MDgwMjcsImV4cCI6MjAzMDA4NDAyN30.D0Wta7Oe4m81fnF0rCLkho0i_KYM8Ab19QyJzfjhiqk';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/Home.html', { root: __dirname })
})

app.get('/servers', async (req, res) => {
    const { data, error } = await supabase
        .from('Server')
        .select('*');
    if (error) {
        console.error('Error fetching data:', error);
        res.send(error);
    } else {
        res.send(data);
    }
});

app.post('/server', express.json(), async (req, res) => {
    var ip_address = req.body.ip_address;
    var server_name = req.body.server_name;
    var country = req.body.country;

    const { data, error } = await supabase
        .from('Server')
        .insert({'ip_address': ip_address, 'server_name': server_name, 'country': country })
        .select();
    if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json(data);
});

app.listen(port, () => {
    console.log(`API Server Running on Port ${port}`)
})