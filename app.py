from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Dummy data for the timeline
timeline_data = [
    {'id': 1, 'content': 'Contract 1', 'start': '2020-01-01', 'end': '2020-12-31'},
    {'id': 2, 'content': 'Contract 2', 'start': '2022-01-01', 'end': '2023-06-30'},
    {'id': 3, 'content': 'Contract 3', 'start': '2021-07-01', 'end': '2022-12-31'}
]

# Dummy data for the heatmap (concentrated in China and Australia)
heatmap_data = [
    # China
    {'latitude': 35.8617, 'longitude': 104.1954, 'count': random.randint(50, 100)},
    {'latitude': 31.2304, 'longitude': 121.4737, 'count': random.randint(50, 100)},
    {'latitude': 39.9042, 'longitude': 116.4074, 'count': random.randint(50, 100)},
    # Australia
    {'latitude': -25.2744, 'longitude': 133.7751, 'count': random.randint(50, 100)},
    {'latitude': -33.8688, 'longitude': 151.2093, 'count': random.randint(50, 100)},
    {'latitude': -37.8136, 'longitude': 144.9631, 'count': random.randint(50, 100)},
    # Other regions for broader coverage
    {'latitude': 40.7128, 'longitude': -74.0060, 'count': random.randint(1, 50)},  # New York
    {'latitude': 34.0522, 'longitude': -118.2437, 'count': random.randint(1, 50)}, # Los Angeles
    {'latitude': 41.8781, 'longitude': -87.6298, 'count': random.randint(1, 50)},  # Chicago
]

flow_diagram_data = {
    'users': ['User A', 'User B', 'User C', 'User D'],
    'data': ['Data 1', 'Data 2', 'Data 3', 'Data 4'],
    'links': [
        {'source': 'User A', 'target': 'Data 1'},
        {'source': 'User A', 'target': 'Data 2'},
        {'source': 'User B', 'target': 'Data 2'},
        {'source': 'User C', 'target': 'Data 3'},
        {'source': 'User D', 'target': 'Data 3'},
        {'source': 'User D', 'target': 'Data 4'},
    ]
}

risk_liability_data = [
    {
        'id': 1,
        'name': 'Financial Report',
        'risk_level': 'high',
        'danger_tags': ['data_leak', 'insider_trading'],
        'description': 'Contains sensitive financial projections. High risk of insider trading if leaked.',
        'liability': 'Potential SEC fines and legal action'
    },
    {
        'id': 2,
        'name': 'Customer Database',
        'risk_level': 'medium',
        'danger_tags': ['privacy_breach', 'identity_theft'],
        'description': 'Includes personal information. Risk of identity theft if compromised.',
        'liability': 'GDPR fines and class action lawsuits'
    },
    {
        'id': 3,
        'name': 'Product Roadmap',
        'risk_level': 'high',
        'danger_tags': ['competitive_advantage', 'trade_secret'],
        'description': 'Details future product plans. Could severely impact competitive advantage if exposed.',
        'liability': 'Loss of market share and potential trade secret litigation'
    },
    {
        'id': 4,
        'name': 'Internal Communication Logs',
        'risk_level': 'low',
        'danger_tags': ['reputational_damage', 'misconduct_evidence'],
        'description': 'May contain sensitive internal discussions. Could be used out of context.',
        'liability': 'Reputational damage and potential HR issues'
    },
    {
        'id': 5,
        'name': 'Source Code Repository',
        'risk_level': 'high',
        'danger_tags': ['intellectual_property', 'security_vulnerability'],
        'description': 'Core IP of the company. Could expose security vulnerabilities if leaked.',
        'liability': 'Loss of competitive edge and potential security breaches'
    }
]

revenue_sharing_data = {
    'total_revenue': 1000000,
    'shared_revenue': 350000,
    'tags': [
        {'name': 'Financial Data', 'revenue': 150000},
        {'name': 'Customer Insights', 'revenue': 100000},
        {'name': 'Product Usage', 'revenue': 75000},
        {'name': 'Market Trends', 'revenue': 25000}
    ]
}

ip_ownership_data = [
    {'title': 'Data Watermarking Algorithm', 'type': 'Patent', 'status': 'Granted'},
    {'title': 'AI-driven Data Classification', 'type': 'Trade Secret', 'status': 'Protected'},
    {'title': 'Encrypted Data Sharing Protocol', 'type': 'Patent', 'status': 'Pending'},
    {'title': 'User Behavior Analytics Model', 'type': 'Copyright', 'status': 'Registered'}
]

agreement_types = [
    {'type': 'Joint IP', 'count': 15, 'description': 'Shared ownership of intellectual property'},
    {'type': 'Perpetual License', 'count': 30, 'description': 'Ongoing right to use the data'},
    {'type': 'Anti-Assignment', 'count': 20, 'description': 'Prohibits transfer of rights to third parties'},
    {'type': 'Data Usage', 'count': 40, 'description': 'Specifies allowed uses of the data'}
]

@app.route('/api/risk-liability-data', methods=['GET'])
def risk_liability_data_api():
    return jsonify(risk_liability_data)

# Add this new route
@app.route('/api/flow-diagram-data', methods=['GET'])
def flow_diagram_data_api():
    return jsonify(flow_diagram_data)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/timeline-data', methods=['GET'])
def timeline_data_api():
    return jsonify(timeline_data)

@app.route('/api/heatmap-data', methods=['GET'])
def heatmap_data_api():
    return jsonify(heatmap_data)

@app.route('/api/revenue-sharing')
def get_revenue_sharing():
    return jsonify(revenue_sharing_data)

@app.route('/api/ip-ownership')
def get_ip_ownership():
    return jsonify(ip_ownership_data)

@app.route('/api/agreement-types')
def get_agreement_types():
    return jsonify(agreement_types)

if __name__ == '__main__':
    app.run(debug=True, port=5002)
