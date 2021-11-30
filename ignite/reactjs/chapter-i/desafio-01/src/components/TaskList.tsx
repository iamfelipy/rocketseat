import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    /*
      pegar title da nova tasks
      criar template que sera salvo
      adicionar nova tasks ao estado tasks
      limpar o campo que o usuário digitou o titulo
    */

    if(!newTaskTitle){
      return;
    }

    const newTask = {
      id: tasks.length < 1 ? 1 : tasks[tasks.length-1].id+1,
      title: newTaskTitle,
      isComplete: false
    };

    setTasks([...tasks, newTask]);

    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    /*
      usar um find para procurar a tasks com o id passado como argumento
      alterar state da task
      inseri novamente task na lista de tasks
    */

    const newTasks = [...tasks];
    const taskID = newTasks.findIndex(task => task.id==id);
    
    newTasks[taskID].isComplete = !newTasks[taskID].isComplete;
    
    setTasks([...newTasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    /*
      fazer destruturação tasks original
      achar o id dele com findIndex
      usar um splice para remover o elemento
      atualizar o state tasks
    */

      const newTasks = [...tasks];
      const taskID = newTasks.findIndex(task=>task.id==id);

      newTasks.splice(taskID,1);

      setTasks([...newTasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}