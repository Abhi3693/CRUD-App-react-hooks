import React, { useState } from 'react';

function App() {
  let [username, setUserName] = useState('');
  let [password, setPassword] = useState('');
  let [isEditing, setIsEditing] = useState(null);

  let [allUsers, setAllUser] = useState(
    JSON.parse(localStorage.getItem('allUsers')) || []
  );

  return (
    <div className='container'>
      <div>
        {createForm({
          username,
          password,
          allUsers,
          setUserName,
          setPassword,
          setAllUser,
          setIsEditing,
          isEditing,
        })}
      </div>
      {allUsers.map((user, index) => {
        return (
          <div className='list-holder' key={index}>
            {index + 1 + ') ' + user.username}
            <button
              className='btn edit'
              onClick={(event) => {
                let { username, password } = allUsers[index];
                setUserName(username),
                  setPassword(password),
                  setAllUser(allUsers);
                setIsEditing(index);
              }}
            >
              Edit
            </button>
            <button
              className='btn delete'
              onClick={(event) => {
                let newUsers = [...allUsers].filter((user, i) => {
                  return i !== index;
                });
                setAllUser(newUsers);
                localStorage.setItem('allUsers', JSON.stringify(newUsers));
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

function createForm(props) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (props.isEditing !== null && props.username && props.password) {
          props.allUsers[props.isEditing] = {
            username: props.username,
            password: props.password,
          };
        }

        if (props.isEditing === null && props.username && props.password) {
          props.allUsers = props.allUsers.concat({
            username: props.username,
            password: props.password,
          });
        }

        props.setAllUser(props.allUsers);
        localStorage.setItem('allUsers', JSON.stringify(props.allUsers));
        props.setUserName('');
        props.setPassword('');
        props.setIsEditing(null);
      }}
    >
      <h1>{props.isEditing ? 'Edit User' : 'Add User'}</h1>
      <input
        className='name-input'
        onChange={(event) => props.setUserName(event.target.value)}
        value={props.username}
        name='username'
        placeholder='Add UserName'
        type='text'
        autoComplete={'username'}
      />
      <input
        className='pass-input'
        onChange={(event) => props.setPassword(event.target.value)}
        name='password'
        placeholder='Add password'
        type='password'
        autoComplete={'current-password'}
        value={props.password}
      />
      <input
        className='submit'
        type='submit'
        value={props.isEditing !== null ? 'Update User' : 'Submit'}
      />
    </form>
  );
}

export default App;
