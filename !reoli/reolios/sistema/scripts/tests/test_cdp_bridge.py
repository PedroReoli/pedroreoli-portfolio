import os
import sys
from pathlib import Path
import unittest

# Adiciona sistema/scripts ao sys.path para compatibilidade
scripts_dir = Path(__file__).resolve().parents[1]
if str(scripts_dir) not in sys.path:
    sys.path.insert(0, str(scripts_dir))

from cdp_bridge.security_auditor import SecurityAuditor
from cdp_bridge.openapi_generator import OpenAPIGenerator
from cdp_bridge.test_exporter import TestExporter
from cdp_bridge.server import load_profile_data


class TestCDPBridgeModules(unittest.TestCase):
    def test_security_auditor_jwt(self):
        fake_jwt = "eyJhbGciOiJub25lIn0.eyJzdWIiOiIxMjMiLCJyb2xlIjoic2VydmljZV9yb2xlIn0."
        res = SecurityAuditor.inspect_jwt(fake_jwt)
        self.assertTrue(res["valid"])
        self.assertEqual(res["role"], "service_role")
        self.assertTrue(any("service_role" in issue for issue in res["issues"]))
        self.assertTrue(any("none" in issue for issue in res["issues"]))

    def test_security_headers_audit(self):
        headers = {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*"
        }
        findings = SecurityAuditor.audit_security_headers(headers)
        self.assertTrue(any(f["category"] == "SECURITY_HEADERS_CORS" for f in findings))
        self.assertTrue(any("CORS Wildcard" in f["title"] for f in findings))

    def test_openapi_generator(self):
        requests = [
            {
                "url": "https://api.myapp.com/v1/users/99482/profile",
                "method": "GET",
                "headers": {"Authorization": "Bearer xxx"},
                "post_data": None
            },
            {
                "url": "https://api.myapp.com/v1/products",
                "method": "POST",
                "headers": {"Content-Type": "application/json"},
                "post_data": '{"name":"Widget","price":29.9,"active":true}'
            }
        ]
        spec = OpenAPIGenerator.generate_spec(requests, title="Test App")
        self.assertEqual(spec["openapi"], "3.0.0")
        self.assertIn("/v1/users/{id}/profile", spec["paths"])
        self.assertIn("get", spec["paths"]["/v1/users/{id}/profile"])
        self.assertIn("/v1/products", spec["paths"])
        self.assertIn("post", spec["paths"]["/v1/products"])

    def test_playwright_exporter(self):
        requests = [
            {"url": "https://app.io/api/me", "method": "GET", "post_data": None}
        ]
        script = TestExporter.generate_playwright_python("https://app.io", requests)
        self.assertIn("async def test_application_flow():", script)
        self.assertIn("https://app.io/api/me", script)

    def test_load_profile_data(self):
        profile = load_profile_data()
        self.assertIsInstance(profile, dict)
        self.assertIn("name", profile)
        self.assertIn("email", profile)
        self.assertIn("phone", profile)
        self.assertIn("role", profile)


if __name__ == "__main__":
    unittest.main()
