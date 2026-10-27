/**
 * Interconnected Clusters & Redundant Multi-WireGuard Mesh Topology
 * Realizes the GBSINFO dual-hub architecture eliminating single points of failure (Anti-SPOF):
 * - Primary Hub: Hub Alpha (Roubaix / OVH DC) - wg-primary (UDP 51820)
 * - Secondary Hub: Hub Beta (Local / Starlink / SDM Backup) - wg-secondary (UDP 51821)
 * - Automatic Failover RTT: < 800ms
 * - Fail-Closed Invariant: Dual ingress paths without route collision (Strict Policy Routing fwmark).
 */

export const MULTI_CLUSTER_INFRA = {
  activePolicy: 'Dual-Homed Multi-Hub WireGuard (Zero SPOF)',
  failoverSlaMs: 780,
  encryptionCipher: 'ChaCha20-Poly1305 (Dual Ephemeral Keys)',
  clusters: [
    {
      id: 'cluster-alpha',
      name: 'Cluster Alpha (Production Datacenter Roubaix)',
      region: 'Roubaix (OVH Cloud)',
      role: 'Master Raft Leader & Primary WAN Hub',
      primaryEndpoint: '198.51.100.10:51820',
      secondaryEndpoint: '198.51.100.11:51821',
      virtualIpRange: '10.87.78.0/24',
      status: 'PRIMARY_ACTIVE',
      health: 100,
      nodesCount: 3,
      rttMs: 17.6,
      lossPct: 0.0,
      interfaces: [
        { name: 'wg-primary', ip: '10.87.78.1', status: 'ACTIVE', state: 'ONLINE', trafficMb: 4210 },
        { name: 'wg-secondary', ip: '10.87.79.1', status: 'STANDBY_HOT', state: 'ONLINE', trafficMb: 340 },
      ],
      nodes: [
        { id: 'node-alpha-1', name: 'alpha-master-1', host: 'gbs-p4', role: 'Raft Leader', cpu: 18.2, ram: 42.1 },
        { id: 'node-alpha-2', name: 'alpha-worker-2', host: 'gbs-p4', role: 'MeshFS Store', cpu: 14.5, ram: 38.0 },
        { id: 'node-alpha-3', name: 'alpha-arbiter', host: 'arbiter-node99', role: 'Quorum Witness', cpu: 4.1, ram: 18.9 },
      ],
    },
    {
      id: 'cluster-beta',
      name: 'Cluster Beta (Site Souverain Lyon / Beynost)',
      region: 'Lyon / Beynost (Dual WAN Fibre + Starlink)',
      role: 'Secondary Failover Mirror & Standby Hub',
      primaryEndpoint: '203.0.113.20:51820',
      secondaryEndpoint: '203.0.113.21:51821',
      virtualIpRange: '10.87.78.0/24',
      status: 'SECONDARY_HOT_STANDBY',
      health: 100,
      nodesCount: 2,
      rttMs: 18.4,
      lossPct: 0.0,
      interfaces: [
        { name: 'wg-primary', ip: '10.87.78.2', status: 'ACTIVE', state: 'ONLINE', trafficMb: 3980 },
        { name: 'wg-secondary', ip: '10.87.79.2', status: 'STANDBY_HOT', state: 'ONLINE', trafficMb: 310 },
      ],
      nodes: [
        { id: 'node-beta-1', name: 'beta-foundry-1', host: 'zaza-desktop', role: 'PMBS Hub', cpu: 22.0, ram: 48.5 },
        { id: 'node-beta-2', name: 'beta-store-2', host: 'med-pmox', role: 'Merkle Slave', cpu: 19.4, ram: 41.2 },
      ],
    },
    {
      id: 'cluster-gamma',
      name: 'Cluster Gamma (Site Distant Edge / Boutique DR)',
      region: 'Edge On-Premise',
      role: 'Disaster Recovery Cold Storage & Local Kiosk',
      primaryEndpoint: '203.0.113.30:51820',
      secondaryEndpoint: '203.0.113.31:51821',
      virtualIpRange: '10.87.78.0/24',
      status: 'REPLICATED_EDGE',
      health: 100,
      nodesCount: 1,
      rttMs: 24.1,
      lossPct: 0.0,
      interfaces: [
        { name: 'wg-primary', ip: '10.87.78.3', status: 'ACTIVE', state: 'ONLINE', trafficMb: 890 },
        { name: 'wg-secondary', ip: '10.87.79.3', status: 'STANDBY_HOT', state: 'ONLINE', trafficMb: 110 },
      ],
      nodes: [
        { id: 'node-gamma-1', name: 'gamma-dr-1', host: 'dr-node100', role: 'Snapshot Invariance', cpu: 8.9, ram: 28.4 },
      ],
    },
  ],

  // Dual redundant links preventing SPOF
  redundantVpnTunnels: [
    {
      id: 'tunnel-alpha-beta-p',
      channel: 'PRIMARY_LINK (Fibre Principale)',
      from: 'cluster-alpha',
      to: 'cluster-beta',
      interface: 'wg-primary',
      port: 51820,
      cipher: 'ChaCha20-Poly1305',
      rttMs: 17.68,
      status: 'ACTIVE_ROUTED',
      packetLoss: 0.0,
      lastHandshake: '1s ago',
      spofProtection: 'Maintenir session SIP/VoIP et Raft en direct',
    },
    {
      id: 'tunnel-alpha-beta-s',
      channel: 'SECONDARY_LINK (Lien de Secours Starlink/LTE)',
      from: 'cluster-alpha',
      to: 'cluster-beta',
      interface: 'wg-secondary',
      port: 51821,
      cipher: 'ChaCha20-Poly1305',
      rttMs: 38.2,
      status: 'HOT_STANDBY',
      packetLoss: 0.0,
      lastHandshake: '2s ago',
      spofProtection: 'Failover automatique sans coupure TCP si la fibre coupe',
    },
    {
      id: 'tunnel-beta-gamma-p',
      channel: 'PRIMARY_LINK (Inter-Datacenter)',
      from: 'cluster-beta',
      to: 'cluster-gamma',
      interface: 'wg-primary',
      port: 51820,
      cipher: 'ChaCha20-Poly1305',
      rttMs: 12.4,
      status: 'ACTIVE_ROUTED',
      packetLoss: 0.0,
      lastHandshake: '1s ago',
      spofProtection: 'Synchronisation Merkle continue des blocs 4Mo',
    },
    {
      id: 'tunnel-alpha-gamma-s',
      channel: 'CROSS_FALLBACK_LINK (Routeur Omada/BGP)',
      from: 'cluster-alpha',
      to: 'cluster-gamma',
      interface: 'wg-secondary',
      port: 51821,
      cipher: 'ChaCha20-Poly1305',
      rttMs: 29.8,
      status: 'HOT_STANDBY',
      packetLoss: 0.0,
      lastHandshake: '3s ago',
      spofProtection: 'Contournement immédiat si le site central est déconnecté',
    },
  ],
}
