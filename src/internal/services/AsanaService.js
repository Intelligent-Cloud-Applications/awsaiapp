import axios from 'axios';

const ASANA_BASE_URL = 'https://app.asana.com/api/1.0';

export const getAsanaTaskInfo = async (taskGid) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(`${ASANA_BASE_URL}/tasks/${taskGid}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Asana task info:', error);
    throw error;
  }
};

export const getAsanaTaskSubtasks = async (taskGid) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(`${ASANA_BASE_URL}/tasks/${taskGid}/subtasks`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Asana task subtasks:', error);
    throw error;
  }
};

export const getAsanaTaskDetails = async (taskGid) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(`${ASANA_BASE_URL}/tasks/${taskGid}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        opt_fields: 'name,notes,assignee.name,subtasks.name,subtasks.assignee.name,subtasks.notes,subtasks.stories,subtasks.completed,subtasks.completed_at,subtasks.due_on,subtasks.created_at,subtasks.modified_at,subtasks.assignee,subtasks.assignee.email,subtasks.assignee.photo,subtasks.assignee.workspaces,subtasks.assignee.resource_type,subtasks.assignee.gid,subtasks.assignee.created_at,subtasks.assignee.modified_at,subtasks.assignee.resource_subtype,subtasks.assignee.follower_count'
      }
    });
    let stories = await getAsanaTaskStories(taskGid)
    return { data: response.data, stories };
  } catch (error) {
    console.error('Error fetching Asana task details:', error);
    throw error;
  }
};

//These are the stories functions

export const getAsanaTaskStories = async (taskGid) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(`${ASANA_BASE_URL}/tasks/${taskGid}/stories`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Asana task stories:', error);
    throw error;
  }
};

export const createAsanaTaskStory = async (taskGid, storyData) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: storyData }) // Wrap storyData in a data object
    };
    
    const response = await fetch(`${ASANA_BASE_URL}/tasks/${taskGid}/stories`, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors ? data.errors[0].message : 'Error creating Asana task story');
    }
    return data.data; // Adjusted based on the typical Asana API response structure
  } catch (error) {
    console.error('Error creating Asana task story:', error);
    throw error;
  }
};


export const deleteAsanaTaskStory = async (storyGid) => {
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(`${ASANA_BASE_URL}/stories/${storyGid}`, options);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error deleting Asana task story:', error);
    throw error;
  }
};

export const updateAsanaTaskStory = async (storyGid, storyData) => {
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: storyData })
  };

  try {
    const response = await fetch(`${ASANA_BASE_URL}/stories/${storyGid}`, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors ? data.errors[0].message : 'Error updating Asana task story');
    }
    return data.data;
  } catch (error) {
    console.error('Error updating Asana task story:', error);
    throw error;
  }
};

export async function updateTask(taskGid, updateData) {
  // Ensure accessToken is retrieved securely
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: updateData // This now dynamically includes any fields passed in updateData
    })
  };

  try {
    const response = await fetch(`https://app.asana.com/api/1.0/tasks/${taskGid}`, options);
    const data = await response.json();
    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(data.errors ? data.errors[0].message : 'Error updating Asana task');
    }
    // console.log(data);
    return data; // Return the updated task data
  } catch (err) {
    console.error('Error updating Asana task:', err); // Log any errors
    throw err; // Rethrow the error for further handling
  }
}

export async function deleteTaskAsana(taskGid) {
  // Ensure accessToken is retrieved securely
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(`https://app.asana.com/api/1.0/tasks/${taskGid}`, options);
    if (!response.ok) {
      // If the response is not 2xx, it will not have JSON body, but we still want to throw an error
      throw new Error('Error deleting Asana task');
    }
    // console.log(`Task ${taskGid} deleted successfully.`);
    return { success: true }; // Return a success indicator
  } catch (err) {
    console.error('Error deleting Asana task:', err);
    throw err; // Rethrow the error for further handling
  }
}

export async function getAllUsersAsana(workspaceGid = "1201921565573954") {
  // Ensure accessToken is retrieved securely
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(`https://app.asana.com/api/1.0/workspaces/${workspaceGid}/users`, options);
    if (!response.ok) {
      // If the response is not 2xx, throw an error
      throw new Error('Error fetching Asana users');
    }
    const data = await response.json(); // Parse the response as JSON
    // console.log(data); 
    return data; // Return the response data
  } catch (err) {
    console.error('Error fetching Asana users:', err);
    throw err; // Rethrow the error for further handling
  }
}

export const fetchUsersWithPendingTasks = async () => {
  const accessToken = localStorage.getItem("accessToken")
  try {
    // Fetch users
    const usersResponse = await axios.get('https://app.asana.com/api/1.0/users', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { workspace: "1201921565573954", opt_fields: 'id,name,email' },
    });
    const users = usersResponse.data.data;

    // Fetch pending tasks for each user
    const usersWithPendingTasks = await Promise.all(users.map(async (user) => {
      try {
        const tasksResponse = await axios.get('https://app.asana.com/api/1.0/tasks', {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            assignee: user.gid,
            workspace: "1201921565573954",
            completed_since: 'now',
            opt_fields: 'id,name,completed,assignee,assignee_status,projects,due_on,created_at,modified_at,notes,comment_count',
            opt_expand: 'projects,due_on,assignee,notes,stories',
          },
        });
        const pendingTasks = tasksResponse.data.data.filter(task => !task.completed);
        return { ...user, pendingTasks };
      } catch (error) {
        console.error(`Error fetching tasks for user ${user.gid}:`, error.response ? error.response.data : error.message);
        return { ...user, pendingTasks: [], error: error.response ? error.response.data.errors[0].message : error.message };
      }
    }));

    // Update UI with usersWithPendingTasks
    // console.log(usersWithPendingTasks);
    return usersWithPendingTasks;
    // Here you would typically update the state of your component or context to re-render the UI with the fetched data
  } catch (error) {
    console.error('Error fetching users or tasks from Asana:', error.response ? error.response.data : error.message);
    // Handle error (e.g., show error message in UI)
  }
};


export const fetchParticularTask = async (taskId) => {
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  };
  try{
    const response = await fetch(`https://app.asana.com/api/1.0/tasks/${taskId}`, options)
    await response.json();
    // console.log('Task:', data);
    return response;
  }catch(error){
    console.error('Error fetching task:', error);
  }
}

export const createAsanaSubtask = async (parentTaskId="1201921565573954", subtaskData) => {
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(subtaskData), // Include subtaskData in the request body
  };
  try {
    const response = await fetch(`https://app.asana.com/api/1.0/tasks/${parentTaskId}/subtasks`, options);
    const data = await response.json();
    // console.log(data);
    return data; // Return the created subtask data
  } catch (error) {
    console.error('Error creating Asana subtask:', error);
  }
};

export const fetchProjects = async (workSpaceId="1201921565573954") => {
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await fetch(`https://app.asana.com/api/1.0/workspaces/${workSpaceId}/projects`, options);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching task count:', error);
  }
};

export const fetchTasksForProject = async (projectId) => {
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await fetch(`https://app.asana.com/api/1.0/projects/${projectId}/tasks`, options);
    const data = await response.json();
    return data.data; // Returns an array of tasks
  } catch (error) {
    console.error('Error fetching tasks for project:', error);
  }
};


export const checkUserWorkspaceMembership = async (accessToken) => {
  try {
    const userResponse = await axios.get('https://app.asana.com/api/1.0/users/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const workspaces = userResponse.data.data.workspaces;
    console.log(userResponse.data.data.gid)
    const isWorkspaceUser = workspaces.some(workspace => workspace.gid === "1201921565573954");
    return isWorkspaceUser; // Returns true if user is a member of the workspace, false otherwise
  } catch (error) {
    console.error('Error checking workspace membership:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const fetchUserDetails = async(userGid) => {
  const access_token = localStorage.getItem('accessToken');
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  };
  try {
    const response = await fetch(`https://app.asana.com/api/1.0/users/${userGid}`, options);
    const data = await response.json();
    return data.data;
  } catch (error) {
      console.error('Error fetching user details:', error); 
  }
};