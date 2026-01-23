import React, { useEffect, useState } from 'react';

const checklistItems = [
  {
    section: 'Environment & Configuration',
    items: [
      'Confirm you\'re using the production API endpoint: https://api.euclidprotocol.com',
      'Remove or replace any testnet-specific addresses, contracts, or chain UIDs',
      'Set your `timeout` values appropriately (e.g. 60, 180) for production latency',
      'Use live wallet addresses and verify all chain configurations',
    ],
  },
  {
    section: 'API Keys & Authentication',
    items: [
      'Create a production API key in the Developer Portal',
      'Store API keys securely using secrets managers or environment variables',
      'Confirm no API keys are hardcoded or checked into version control',
      'Rotate keys if they were exposed or used in development',
    ],
  },
  {
    section: 'Transaction Flow',
    items: [
      'Simulate trades before submitting them with real assets',
      'Confirm `slippage` values are reasonable for your asset pairs',
      'Handle swap rejections or failures gracefully',
      'Ensure you’re only submitting transactions with confirmed `swap_path` or routes',
      'Broadcast only fully signed messages to the appropriate chain',
    ],
  },
  {
    section: 'Error Handling & Edge Cases',
    items: [
      'Handle all API response types (4xx, 5xx)',
      'Implement retry logic with backoff where needed',
      'Validate all inputs client- and server-side',
      'Ensure duplicate requests are idempotent',
    ],
  },
  {
    section: 'Logging & Monitoring',
    items: [
      'Log all outgoing API requests (excluding sensitive data)',
      'Log all error responses for debugging',
      'Set up error alerting or Sentry-style tracking',
      'Sanitize logs to avoid leaking PII or private keys',
    ],
  },
  {
    section: 'Security',
    items: [
      'Ensure all wallet signing is done through trusted sources (e.g. MetaMask, Keplr)',
      'Avoid exposing private keys in any frontend context',
      'Ensure transactions are chain-specific and cannot be replayed elsewhere',
    ],
  },
  {
    section: 'Production Checklist',
    items: [
      'Review all contracts, addresses, and tokens used',
      'Test every step in production with a small real trade',
      'Review fallback and error pages for user experience',
    ],
  },
  {
    section: 'Stay Updated',
    items: [
      'Subscribe to API announcements or follow the changelog',
      'Monitor for new token integrations or protocol changes',
    ],
  },
];

const LOCAL_STORAGE_KEY = 'euclid-go-live-checklist';

export default function GoLiveChecklist() {
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setChecked(JSON.parse(stored));
    } else {
      setChecked(new Array(checklistItems.flatMap(section => section.items).length).fill(false));
    }
  }, []);

  useEffect(() => {
    if (checked.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checked));
    }
  }, [checked]);

  const toggle = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  let itemCounter = 0;

  return (
    <div className="space-y-8">
      {checklistItems.map(({ section, items }) => (
        <div key={section}>
          <h3>{section}</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {items.map((item, i) => {
              const globalIndex = itemCounter++;
              return (
                <li key={i} style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={checked[globalIndex] || false}
                      onChange={() => toggle(globalIndex)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <span>{item}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}