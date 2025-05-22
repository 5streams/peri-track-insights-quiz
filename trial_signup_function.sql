-- Create a stored procedure to handle trial signups
CREATE OR REPLACE FUNCTION handle_trial_signup(name text, email text, notes text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
  new_lead_id uuid;
  result json;
BEGIN
  -- Check if user already exists
  SELECT id INTO new_user_id FROM users WHERE users.email = handle_trial_signup.email;
  
  -- If user doesn't exist, create a new one
  IF new_user_id IS NULL THEN
    INSERT INTO users (name, email)
    VALUES (handle_trial_signup.name, handle_trial_signup.email)
    RETURNING id INTO new_user_id;
  END IF;
  
  -- Create a new lead entry
  INSERT INTO leads (user_id, name, email, source, status, notes)
  VALUES (
    new_user_id, 
    handle_trial_signup.name, 
    handle_trial_signup.email, 
    'TRIAL', 
    'new', 
    handle_trial_signup.notes
  )
  RETURNING id INTO new_lead_id;
  
  -- Construct the result
  SELECT json_build_object(
    'success', true,
    'user_id', new_user_id,
    'lead_id', new_lead_id,
    'message', 'Trial signup successful'
  ) INTO result;
  
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM,
      'message', 'Trial signup failed'
    );
END;
$$;

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION handle_trial_signup(text, text, text) TO authenticated; 