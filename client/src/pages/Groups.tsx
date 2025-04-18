
import React, { useState } from 'react';

interface Group {
  id: number;
  name: string;
  members: string[];
}

const GroupPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [newUserName, setNewUserName] = useState<string>('');
  const [people] = useState<string[]>([
    'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hannah'
  ]);

  // Function to handle creating a new group
  const createGroup = () => {
    if (groupName.trim()) {
      const newGroup: Group = {
        id: groups.length + 1,
        name: groupName,
        members: [newUserName]
        // Add the user who created the group
      };
      setGroups([...groups, newGroup]);
      // Reset the group name input
      setGroupName('');
      // Reset the user name input 
      setNewUserName('');
    }
  };

  // Function to add the current user to a group
  const addSelfToGroup = (groupId: number) => {
    if (newUserName.trim()) {
      setGroups(groups.map(group =>
        group.id === groupId && !group.members.includes(newUserName)
          ? { ...group, members: [...group.members, newUserName] }
          : group
      ));
      setNewUserName(''); // Clear the new user input
    }
  };

  // Function to add a random user to a group
  const addRandomUserToGroup = (groupId: number) => {
    // Get a random person from the people list
    const randomPerson = people[Math.floor(Math.random() * people.length)];

    // Add the random person to the selected group
    setGroups(groups.map(group =>
      group.id === groupId && !group.members.includes(randomPerson)
        ? { ...group, members: [...group.members, randomPerson] }
        : group
    ));
  };

  return (
    <div>
      <h1>Movie Night Groups</h1>

      {/* Create Group Section */}
      <div>
        <input
          type='text'
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder='Enter group name'
        />
        <input
          type='text'
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder='Enter your name'
        />
      </div>
      <div>
        <button className='btn btn-outline-light' onClick={createGroup}>Create Group</button>
      </div>

      {/* List of Groups */}
      {groups.length === 0 ? (
        <p>No groups created yet. Start by creating one!</p>
      ) : (
        groups.map((group) => (
          <div key={group.id}>
            <h3>{group.name}</h3>
            <p>Members: {group.members.length > 0 ? group.members.join(', ') : 'No members yet'}</p>
            <button onClick={() => addSelfToGroup(group.id)}>Add Yourself</button>
            <button onClick={() => addRandomUserToGroup(group.id)}>
              Add Random Person
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default GroupPage;

