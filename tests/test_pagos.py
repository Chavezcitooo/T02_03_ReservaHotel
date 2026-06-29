import unittest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestPagos(unittest.TestCase):
    pass

if __name__ == "__main__":
    unittest.main()