# backend/api/ai_payments.py

def generate_payment_plan(topic):
    """
    Demo AI payment plan function.
    Returns a fake plan based on the topic.
    """
    return {"plan": f"Demo plan for topic '{topic}'"}

def generate_ai_tipping_plan(engagement_data):
    """
    Demo AI tipping plan.
    Always returns 1.5 USDC for testing purposes.
    """
    return 1.5  # 1.5 USDC

def send_usdc(to_address, amount, chain_id=11155111):
    """
    Demo-only: simulates sending USDC.
    Returns a fake transaction hash.
    """
    print(f"[DEMO] send_usdc called: to={to_address}, amount={amount}, chain_id={chain_id}")
    return "0xDEMO_FAKE_TX_HASH_000000000000000000000000000000000000000000"
