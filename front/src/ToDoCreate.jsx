import {  useState } from 'react'
import api from "./api"

const ToDoCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {

        try {
            const response = await api.post('/todoes', formData);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Tarefa:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />

            <button type="submit">criar</button>
        </form>

    )
}

export default ToDoCreate;