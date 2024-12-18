import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountsTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    account_type: "SAVINGS",
    balance: "",
    bank: "",
  });
  const [editAccountId, setEditAccountId] = useState(null);
  const [editAccount, setEditAccount] = useState({
    account_type: "SAVINGS",
    balance: "",
    bank: "",
  });
  const [user, setUser] = useState(null);  // State to store user info

  const API = "http://localhost:8000/home/accounts/"; // Replace with your API endpoint
  const token = localStorage.getItem("accessToken");

  // Fetch User Information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/", { // Adjust this URL to your actual user endpoint
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);  // Store the user data
      } catch (err) {
        console.error("Error fetching user:", err.response ? err.response.data : err);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  // Fetch Accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAccounts(res.data);
      } catch (err) {
        console.error("Error fetching accounts:", err.response ? err.response.data : err);
      }
    };

    if (token) {
      fetchAccounts();
    }
  }, [token]);

  // Create Account
  const handleCreateAccount = async () => {
    if (!newAccount.balance || !newAccount.bank) {
      alert("Balance and Bank are required fields.");
      return;
    }

    if (!user) {
      alert("User is not logged in or user data not available.");
      return;
    }

    const accountData = {
      user: user.id,  // Use the fetched user ID
      account_type: newAccount.account_type,
      balance: parseFloat(newAccount.balance), // Convert balance to a number
      bank: newAccount.bank,
    };

    try {
      const res = await axios.post('http://localhost:8000/home/accounts/create/', accountData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts([...accounts, res.data]); // Add the new account to the list
      setNewAccount({ account_type: "SAVINGS", balance: "", bank: "" }); // Reset form
    } catch (err) {
      console.error("Error creating account:", err.response ? err.response.data : err);
    }
  };

  // Edit Account
  const handleEditAccount = (account) => {
    setEditAccountId(account.id);
    setEditAccount({
      account_type: account.account_type,
      balance: account.balance,
      bank: account.bank,
      user:account.user
    });
  };

  // Update Account
  const handleUpdateAccount = async () => {
    if (!user) {
      alert("User is not logged in or user data not available.");
      return;
    }

    const updatedData = {
      ...editAccount,
      balance: parseFloat(editAccount.balance), // Convert balance to a number
    //   user: user.id,  // Use the fetched user ID
    };

    try {
      const res = await axios.put(`${API}${editAccountId}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(
        accounts.map((acc) => (acc.id === editAccountId ? res.data : acc))
      );
      setEditAccountId(null);
      setEditAccount({ account_type: "SAVINGS", balance: "", bank: "" }); // Reset form
    } catch (err) {
      console.error("Error updating account:", err.response ? err.response.data : err);
    }
  };

  // Delete Account
  const handleDeleteAccount = async (id) => {
    try {
      await axios.delete(`${API}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(accounts.filter((acc) => acc.id !== id)); // Remove deleted account from the list
    } catch (err) {
      console.error("Error deleting account:", err.response ? err.response.data : err);
    }
  };

  return (
    <div>
      <h2>Accounts List</h2>

      {/* Create Account */}
      <div>
        <h3>Create Account</h3>
        <select
          value={newAccount.account_type}
          onChange={(e) =>
            setNewAccount({ ...newAccount, account_type: e.target.value })
          }
        >
          <option value="SAVINGS">SAVINGS</option>
          <option value="CURRENT">CURRENT</option>
        </select>
        <input
          type="text"
          placeholder="Balance"
          value={newAccount.balance}
          onChange={(e) =>
            setNewAccount({ ...newAccount, balance: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Bank Name"
          value={newAccount.bank}
          onChange={(e) =>
            setNewAccount({ ...newAccount, bank: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="user Id"
          value={newAccount.user}
          onChange={(e) =>
            setNewAccount({ ...newAccount, bank: e.target.value })
          }
        />
        <button onClick={handleCreateAccount}>Create</button>
      </div>

      {/* Accounts Table */}
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Bank</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              {editAccountId === account.id ? (
                <>
                  <td>{account.id}</td>
                  <td>
                    <select
                      value={editAccount.account_type}
                      onChange={(e) =>
                        setEditAccount({
                          ...editAccount,
                          account_type: e.target.value,
                        })
                      }
                    >
                      <option value="SAVINGS">SAVINGS</option>
                      <option value="CURRENT">CURRENT</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editAccount.balance}
                      onChange={(e) =>
                        setEditAccount({
                          ...editAccount,
                          balance: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editAccount.bank}
                      onChange={(e) =>
                        setEditAccount({ ...editAccount, bank: e.target.value })
                      }
                    />
                  </td>
                  <td>
                  <input
                      type="text"
                      value={editAccount.user}
                      onChange={(e) =>
                        setEditAccount({ ...editAccount, bank: e.target.value })
                      }
                      />
                  </td>
                  <td>
                    <button onClick={handleUpdateAccount}>Save</button>
                    <button onClick={() => setEditAccountId(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{account.id}</td>
                  <td>{account.account_type}</td>
                  <td>{account.balance}</td>
                  <td>{account.bank}</td>
                  <td>{account.user}</td>
                  <td>
                    <button onClick={() => handleEditAccount(account)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteAccount(account.id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsTable;
