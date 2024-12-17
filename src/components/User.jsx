import { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerList() {
  // State to store customers data, loading state, and error state
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to manage loading feedback
  const [error, setError] = useState(null); // Error state to manage any fetch errors

  const [newCustomer, setNewCustomer] = useState({
    customer_name: '',
    contact_info: '',
  });

  const [editCustomer, setEditCustomer] = useState({
    id: null,
    customer_name: '',
    contact_info: '',
  });

  const API = 'http://localhost:8000/home/customers/';
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Start loading
        setLoading(true);
        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Set customers and stop loading
        setCustomers(res.data);
        setLoading(false);
        console.log(res.data); // Log to check the response
      } catch (err) {
        // Handle error and stop loading
        setError('Error fetching customers');
        setLoading(false);
        console.error('Error fetching customers:', err);
      }
    };

    fetchCustomers();
  }, [API, token]);

  // Handle Create Customer
  const handleCreateCustomer = async () => {
    try {
      const res = await axios.post(API, newCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers([...customers, res.data]);
      setNewCustomer({
        customer_name: '',
        contact_info: '',
      });
    } catch (err) {
      console.error('Error creating customer:', err);
    }
  };

  // Handle Edit Customer
  const handleEditCustomer = (customer) => {
    setEditCustomer({
      id: customer.id,
      customer_name: customer.customer_name,
      contact_info: customer.contact_info,
    });
  };

  // Handle Update Customer
  const handleUpdateCustomer = async () => {
    try {
      const res = await axios.put(`${API}${editCustomer.id}/`, editCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(
        customers.map((customer) =>
          customer.id === editCustomer.id ? res.data : customer
        )
      );
      setEditCustomer({
        id: null,
        customer_name: '',
        contact_info: '',
      });
    } catch (err) {
      console.error('Error updating customer:', err);
    }
  };

  // Handle Delete Customer
  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`${API}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (err) {
      console.error('Error deleting customer:', err);
    }
  };

  // Render loading state or error if necessary
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Customer List</h1>

      {/* Create Customer */}
      <div>
        <h3>Create Customer</h3>
        <input
          type="text"
          placeholder="Customer Name"
          value={newCustomer.customer_name}
          onChange={(e) => setNewCustomer({ ...newCustomer, customer_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={newCustomer.contact_info}
          onChange={(e) => setNewCustomer({ ...newCustomer, contact_info: e.target.value })}
        />
        <button onClick={handleCreateCustomer}>Create</button>
      </div>

      {/* Edit Customer */}
      {editCustomer.id && (
        <div>
          <h3>Edit Customer</h3>
          <input
            type="text"
            value={editCustomer.customer_name}
            onChange={(e) => setEditCustomer({ ...editCustomer, customer_name: e.target.value })}
          />
          <input
            type="text"
            value={editCustomer.contact_info}
            onChange={(e) => setEditCustomer({ ...editCustomer, contact_info: e.target.value })}
          />
          <button onClick={handleUpdateCustomer}>Update</button>
          <button onClick={() => setEditCustomer({ id: null, customer_name: '', contact_info: '' })}>Cancel</button>
        </div>
      )}

      {/* Customer List */}
      {customers.length === 0 ? (
        <p>No customers available.</p>
      ) : (
        customers.map((customer) => (
          <div key={customer.id} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd' }}>
            <h2>{customer.customer_name}</h2>
            <p><strong>Contact Info:</strong> {customer.contact_info}</p>

            <h3>Accounts:</h3>
            {customer.accounts && customer.accounts.length > 0 ? (
              customer.accounts.map((account) => (
                <div key={account.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #f0f0f0' }}>
                  <p><strong>Account ID:</strong> {account.id}</p>
                  <p><strong>Account Type:</strong> {account.account_type}</p>
                  <p><strong>Balance:</strong> {account.balance}</p>

                  <h4>User Info:</h4>
                  <p><strong>Username:</strong> {account.user?.username || 'N/A'}</p>
                  <p><strong>Email:</strong> {account.user?.email || 'N/A'}</p>
                  <p><strong>First Name:</strong> {account.user?.first_name || 'N/A'}</p>
                  <p><strong>Last Name:</strong> {account.user?.last_name || 'N/A'}</p>
                  <p><strong>Is Active:</strong> {account.user?.is_active ? 'Yes' : 'No'}</p>

                  <h4>Bank Info:</h4>
                  <p><strong>Bank Name:</strong> {account.bank?.bank_name || 'N/A'}</p>
                  <p><strong>Location:</strong> {account.bank?.location || 'N/A'}</p>

                  <h4>Customer Info:</h4>
                  <p><strong>Customer Name:</strong> {account.customer?.customer_name || 'N/A'}</p>
                  <p><strong>Customer Contact Info:</strong> {account.customer?.contact_info || 'N/A'}</p>
                </div>
              ))
            ) : (
              <p>No accounts available for this customer.</p>
            )}

            <button onClick={() => handleEditCustomer(customer)}>Edit</button>
            <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerList;
