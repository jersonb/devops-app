import { useEffect, useState } from 'react'
import api from "./api"


const TodoesList = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {

            var { data: response } = await api.get("/todoes")
            setData(response)

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => { fetchData(); }, []);

    async function handlerFinish(id) {
        try {
            var response = await api.patch(`todoes/${id}`);
            if (response.status === 202) {
                await fetchData();
            }
            console.log('Success:', response);

        } catch (error) {
            console.error('Error:', error);

        }
    }

    if (loading || !data || data.length === 0) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }


    return (
        <div className="App">
            <hr />

            <h3>Tarefas</h3>
            <table style={{
                borderRadius:"1em",
                border: "1px solid black",
                borderStyle:"hidden",
                borderWidth:"1rem",
                padding:"1rem",
                borderSpacing:"30px",

                }}>
                <tbody>
                    <tr>

                        <th>Tarefa</th>
                        <th>Data</th>
                        <th>Finalizada</th>
                        <th></th>
                    </tr>

                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                            <td>{item.finishedAt ? new Date(item.finishedAt).toLocaleString() : "-" }</td>
                            {item.checked
                                ? <td>concluída</td>
                                : <td><a onClick={() => handlerFinish(item.id)}>concluir</a> </td>
                            }

                        </tr>
                    ))}
                </tbody>

            </table>

        </div>


    )


}

export default TodoesList;