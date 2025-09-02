/**
 * API helper functions created for feature-api
 * Generated at: 2025-09-02T13:01:35.691Z
 * Task: Create a simple API endpoint file api.js with a hello world function
 */

/**
 * Fetch JSON data from API endpoint
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} JSON response
 */
async function fetchJSON(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleErrors(error);
  }
}

/**
 * Post data to API endpoint
 * @param {string} url - API endpoint URL
 * @param {Object} data - Data to post
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Response data
 */
async function postData(url, data, options = {}) {
  return fetchJSON(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options
  });
}

/**
 * Handle API errors consistently
 * @param {Error} error - Error to handle
 * @returns {Object} Error response
 */
function handleErrors(error) {
  console.error('API Error:', error.message);
  return {
    success: false,
    error: error.message,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  fetchJSON,
  postData,
  handleErrors
};