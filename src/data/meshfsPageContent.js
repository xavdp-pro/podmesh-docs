/**
 * Complete trilingual content for MeshFS showcase (meshfs.xavdp.pro).
 * Follows Shaper OS principles, 3-tier audience (Humans / Geeks / AI Agents),
 * and Didactic Clarification Mode.
 */

export const clarificationGlossary = {
  fr: {
    cas: {
      term: 'CAS (Content Addressable Storage)',
      short: 'Stockage adressé par le contenu',
      desc: 'Au lieu de donner un nom arbitraire à un bloc de données, son nom EST son empreinte numérique unique (hachage SHA-256). Deux fichiers ayant le même contenu génèrent le même bloc : la déduplication est donc automatique et mathématiquement parfaite.',
    },
    fastcdc: {
      term: 'FastCDC',
      short: 'Découpage intelligent selon le contenu',
      desc: 'Algorithme qui découpe intelligemment les gros fichiers en morceaux d\'environ 4 Mo en analysant les motifs des octets. Si vous modifiez une seule phrase dans un fichier de 10 Go, seul un bloc de 4 Mo est réécrit au lieu de tout renvoyer.',
    },
    merkle: {
      term: 'Arbre de Merkle',
      short: 'Sceau cryptographique hiérarchique',
      desc: 'Une structure arborescente où chaque feuille est un bloc de données et la racine résume l\'ensemble du fichier. Il suffit de vérifier la racine pour certifier qu\'aucun octet n\'a été altéré ou corrompu.',
    },
    fuse: {
      term: 'FUSE (Filesystem in Userspace)',
      short: 'Système de fichiers en espace utilisateur',
      desc: 'Technologie native du noyau Linux permettant d\'exposer un système de fichiers comme un dossier ordinaire sans avoir besoin de développer de pilote noyau dangereux ni de posséder les droits administrateur root.',
    },
    p2p: {
      term: 'Gossip P2P (Pair-à-pair)',
      short: 'Échange décentralisé direct',
      desc: 'Protocole où les machines s\'échangent les blocs directement entre elles comme dans BitTorrent. Aucun serveur centralisé : chaque nœud est à la fois client et serveur, éliminant tout goulot d\'étranglement.',
    },
    spof: {
      term: 'Zéro SPOF (Single Point of Failure)',
      short: 'Zéro point unique de défaillance',
      desc: 'Architecture où aucun nœud n\'est indispensable. Si le serveur principal tombe en panne, le cluster continue de fonctionner normalement car les données et les règles sont distribuées partout.',
    },
    selfhealing: {
      term: 'Auto-guérison (Self-Healing)',
      short: 'Récupération autonome des blocs',
      desc: 'Si un bloc est endommagé ou qu\'un disque tombe, le nœud local détecte immédiatement l\'écart grâce au SHA-256 et télécharge la copie saine auprès des pairs en quelques millisecondes.',
    },
    btrfs: {
      term: 'Btrfs Copy-on-Write (CoW)',
      short: 'Système de fichiers moderne à copie sur écriture',
      desc: 'Ne modifie jamais un bloc en place mais écrit toujours la nouvelle version à côté. Offre des instantanés (snapshots) immédiats à zéro octet et une vérification matérielle continue contre la pourriture des données (bit-rot).',
    },
  },
  en: {
    cas: {
      term: 'CAS (Content Addressable Storage)',
      short: 'Content Addressable Storage',
      desc: 'Instead of assigning an arbitrary filename to a block, its address IS its cryptographic SHA-256 hash. Identical blocks share the same identifier, making deduplication automatic and mathematically flawless.',
    },
    fastcdc: {
      term: 'FastCDC',
      short: 'Fast Content-Defined Chunking',
      desc: 'An algorithm that dynamically slices large files into bounded chunks (~4MB) based on byte patterns. Modifying a few bytes in a 10GB file only regenerates a single 4MB chunk instead of re-uploading everything.',
    },
    merkle: {
      term: 'Merkle Tree',
      short: 'Hierarchical Cryptographic Seal',
      desc: 'A tree structure where data blocks form the leaves and parent nodes hash their children up to a single Merkle root. Verifying the root guarantees bit-for-bit integrity of the entire volume.',
    },
    fuse: {
      term: 'FUSE (Filesystem in Userspace)',
      short: 'Filesystem in Userspace',
      desc: 'A native Linux kernel mechanism enabling unprivileged user programs to export a standard POSIX filesystem without compiling risky in-kernel drivers or requiring root privileges.',
    },
    p2p: {
      term: 'P2P Gossip Replication',
      short: 'Direct Peer-to-Peer Exchange',
      desc: 'A BitTorrent-style protocol where nodes replicate immutable chunks directly with neighbors. No central controller, no bottleneck: every peer participates in storage and distribution.',
    },
    spof: {
      term: 'Zero SPOF (Single Point of Failure)',
      short: 'Zero Single Point of Failure',
      desc: 'A resilient topology where no machine is a fatal dependency. If any server goes offline, the remaining nodes continue serving and reconciling data autonomously.',
    },
    selfhealing: {
      term: 'Self-Healing Storage',
      short: 'Autonomous Block Restoration',
      desc: 'If a local block becomes corrupted or missing, the node detects hash divergence via SHA-256 and silently fetches a healthy replica from peers within milliseconds.',
    },
    btrfs: {
      term: 'Btrfs Copy-on-Write (CoW)',
      short: 'Modern Copy-on-Write Filesystem',
      desc: 'Never overwrites active blocks in-place; writes new data to fresh space before updating pointers. Delivers zero-cost instantaneous snapshots and built-in protection against bit-rot.',
    },
  },
  es: {
    cas: {
      term: 'CAS (Content Addressable Storage)',
      short: 'Almacenamiento direccionado por contenido',
      desc: 'En lugar de nombres arbitrarios, la dirección de cada bloque es su hash SHA-256. Bloques idénticos comparten el mismo identificador, garantizando deduplicación nativa y matemáticamente perfecta.',
    },
    fastcdc: {
      term: 'FastCDC',
      short: 'Fragmentación rápida definida por contenido',
      desc: 'Algoritmo que divide archivos grandes en bloques de ~4 MB analizando patrones de bytes. Modificar unos datos en un archivo de 10 GB solo reescribe un bloque de 4 MB.',
    },
    merkle: {
      term: 'Árbol de Merkle',
      short: 'Sello criptográfico jerárquico',
      desc: 'Estructura en árbol donde cada bloque es una hoja y la raíz sella todo el archivo. Validar la raíz garantiza matemáticamente la integridad absoluta de los datos.',
    },
    fuse: {
      term: 'FUSE (Filesystem in Userspace)',
      short: 'Sistema de archivos en espacio de usuario',
      desc: 'Mecanismo nativo de Linux que permite montar un sistema de archivos como una carpeta normal sin controladores de kernel peligrosos ni permisos de administrador root.',
    },
    p2p: {
      term: 'Gossip P2P (Punto a punto)',
      short: 'Intercambio directo entre pares',
      desc: 'Protocolo descentralizado tipo BitTorrent donde los nodos se transfieren bloques directamente. Sin servidor central ni cuellos de botella.',
    },
    spof: {
      term: 'Cero SPOF (Sin punto único de fallo)',
      short: 'Resiliencia total sin dependencia central',
      desc: 'Arquitectura donde ningún servidor es indispensable. Si un nodo cae, la red sigue operando con normalidad y sin interrupciones.',
    },
    selfhealing: {
      term: 'Auto-curación (Self-Healing)',
      short: 'Recuperación autónoma de bloques',
      desc: 'Si un bloque se corrompe o falta, el nodo detecta la discrepancia por SHA-256 y descarga la copia sana desde otro nodo en milisegundos.',
    },
    btrfs: {
      term: 'Btrfs Copy-on-Write (CoW)',
      short: 'Sistema de archivos moderno con copia en escritura',
      desc: 'Nunca sobrescribe datos existentes; escribe en espacio libre y actualiza punteros. Ofrece instantáneas instantáneas sin coste de espacio y protección contra corrupción silenciosa.',
    },
  },
}

export const meshfsContent = {
  fr: {
    hero: {
      kicker: 'Stockage Distribué P2P Souverain · Version 2.3.0',
      title: 'MeshFS : Le Système de Fichiers Distribué sans Usine à Gaz.',
      subtitle:
        'Dédié aux postes Linux, conteneurs Podman et hyperviseurs Proxmox VE. Déduplication 4 Mo CAS, réplication P2P chiffrée WireGuard et montage FUSE immédiat sans modifier le noyau.',
      goldenQuote:
        '« Regarde ce que le noyau Linux moderne offre déjà en natif et exploite-le sans intermédiaire. »',
      goldenAuthor: 'Loi Fondamentale Shaper OS',
      badgeStatus: 'Qualifié sur le Fer Réel · 106 Mo/s FUSE · 36 ms Reconstruction',
      btnQuickstart: 'Démarrage Rapide',
      btnUseCases: 'Voir les Cas d’Usage',
      btnDebRepo: 'Dépôt Debian 13 (APT)',
    },
    clarificationBanner: {
      title: 'Mode Clarification & Pédagogie',
      desc: 'Première visite ? Activez ce mode pour faire apparaître des infobulles didactiques vulgarisant chaque concept technique (CAS, Merkle, FUSE, FastCDC, P2P...).',
      activeLabel: 'Mode Clarification Activé',
      inactiveLabel: 'Activer le Mode Clarification',
    },
    audienceToggle: {
      human: '👤 Pour Tout le Monde (Simple)',
      geek: '⚡ Pour les Geeks & Ingénieurs',
      agent: '🤖 Protocole Agent IA (Shaper OS)',
    },
    sections: {
      concepts: {
        kicker: 'Fondations & Concepts',
        title: 'Pourquoi MeshFS Réinvente le Stockage sans Réinventer la Roue',
        human: {
          lead: 'Les solutions classiques comme Ceph ou Gluster exigent des clusters lourds, des serveurs de métadonnées fragiles et des modules noyau complexes. MeshFS prend le contre-pied absolu.',
          points: [
            {
              title: 'Zéro Serveur Central (SPOF)',
              desc: 'Toutes les machines sont égales. Vos fichiers continuent de vivre même si deux tiers des nœuds sont éteints.',
            },
            {
              title: 'Déduplication Instantanée',
              desc: 'Si 10 machines virtuelles partagent la même Debian 13, les blocs identiques ne sont stockés qu’une seule fois. Gain d’espace typique : 80 à 90 %.',
            },
            {
              title: 'Montable comme une Clé USB',
              desc: 'Grâce à FUSE, votre stockage distribué apparaît comme un dossier ordinaire (~/meshfs-live) sur votre bureau Linux.',
            },
            {
              title: 'Auto-guérison Silencieuse',
              desc: 'Un bloc est endommagé ? Le système s’en aperçoit et va le chercher chez un pair en 36 millisecondes sans vous déranger.',
            },
          ],
        },
        geek: {
          lead: 'MeshFS assemble la fine fleur des primitives éprouvées de Linux : FUSE 3, FastCDC, SHA-256 CAS, Merkle CoW, WireGuard in-kernel et Btrfs.',
          specs: [
            { label: 'Granularité CAS', value: '4 MiB (FastCDC dynamique)' },
            { label: 'Signature d’Intégrité', value: 'SHA-256 bit-exact sur chaque chunk' },
            { label: 'Débit FUSE local mesuré', value: '106 Mo/s (fdatasync saturation fil)' },
            { label: 'Débit NVMe sous-jacent', value: '895 Mo/s sur stockage Btrfs' },
            { label: 'Reconstruction d’un chunk', value: '36 ms (stream réseau P2P)' },
            { label: 'Temps d’auto-guérison', value: '0.64 s (réparation 16 Mo corrompus)' },
            { label: 'Empreinte Mémoire', value: '< 16 Mo de RAM par daemon' },
          ],
          codeTitle: 'Arborescence du Pool CAS (/var/lib/meshfs-pool)',
          code: `/var/lib/meshfs-pool/
├── cas_chunks/               # Chunks immuables 4 Mo hachés en SHA-256
│   ├── 0a4f89...7b2.chunk
│   ├── c9e31b...a10.chunk
│   └── ffe812...044.chunk
├── meta/                     # Arbres de Merkle et manifests scellés
│   └── manifests/
│       └── vm-101-disk.raw.json
└── data/                     # Point de montage FUSE propre exposé à l'utilisateur
    ├── benchmarks/
    ├── config/
    └── documents/`,
        },
        agent: {
          lead: 'Spécification déterministe pour Agents IA en tandem sous Shaper OS (Règle 0G & Règle 38).',
          invariants: [
            'Invariant CAS-01 : Tout chunk C vérifie digest(C) == hex(SHA256(C.bytes)). Rejet immédiat sur discordance.',
            'Invariant COW-02 : Écriture atomique via staging tmp -> rename(tmp, final) sur le même VFS.',
            'Invariant R38-03 : Bornage des tentatives de réparation à k <= 2. Défaillance fail-closed après 2 échecs.',
            'Invariant NET-04 : GEM-001 zéro port d’écoute public WAN ; transit exclusivement chiffré WireGuard wg0.',
          ],
          cliContract: `# Ingestion atomique d'un fichier dans le CAS
meshfs-p2p write <source_path> <relative_volume_key>

# Lecture déterministe par racine Merkle
meshfs-p2p read <merkle_root_sha256> <destination_path>

# Synchronisation gossip LAN sans coordinateur
meshfs-p2p sync`,
        },
      },
      genesis: {
        kicker: 'Histoire & Philosophie',
        title: 'La Genèse : Comment la Sauvegarde PMBS a Donné Naissance à MeshFS',
        human: {
          lead: 'Nous n’avons pas cherché à créer un système de fichiers distribué ex nihilo. Nous avons simplement cherché à résoudre un problème concret : fabriquer la sauvegarde de conteneurs la plus indestructible au monde.',
          story:
            'Au départ, il y avait PMBS (PodMesh Backup Server) : pour sauvegarder nos conteneurs sans saturer les disques, nous devions découper les disques en blocs de 4 Mo dédupliqués, hachés en SHA-256 et scellés dans un arbre de Merkle. Une fois ce moteur achevé, l’illumination Shaper OS est apparue : un backup immuable découpé en blocs de 4 Mo, si on le branche sur du P2P et une couche de montage FUSE... ce n’est plus une archive morte : c’est un système de fichiers distribué vivant !',
        },
        geek: {
          lead: 'PMBS et MeshFS partagent la même structure de données fondamentale. Aucun besoin de conversion ou de re-chunking.',
          points: [
            'Le même bloc de 4 Mo écrit par un conteneur en direct dans MeshFS est déjà sous le format parfait pour la sauvegarde froide PMBS.',
            'La réplication P2P gossip permet de propager les blocs chauds entre hyperviseurs, tandis que PMBS archive les racines Merkle immuables.',
            'Résultat : la frontière entre "stockage de production actif" et "sauvegarde externalisée" a totalement disparu.',
          ],
        },
        agent: {
          contract: `{
  "subsystem": "MeshFS <-> PMBS Invariance",
  "block_size_bytes": 4194304,
  "hash_algorithm": "SHA-256",
  "metadata_format": "JSON-Merkle-v2",
  "atomic_swap": "POSIX renameat2(RENAME_NOREPLACE)",
  "posix_metadata": ["mode", "uid", "gid", "mtime", "size"]
}`,
        },
      },
      usecases: {
        kicker: 'Cas d’Usage Concrets',
        title: 'Déployé et Éprouvé sur le Terrain',
        items: [
          {
            id: 'workstation',
            title: '1. Montage Workstation & LXC (FUSE)',
            human: 'Montez votre stockage distribué dans votre répertoire personnel (~/meshfs-live) en simple utilisateur, sans mot de passe root. Accédez à vos fichiers à pleine vitesse réseau.',
            geek: 'Montage FUSE 3 en userland avec pool quota strict de 5,00 Mo. Débit mesuré : 106 Mo/s en écriture synchrone avec fdatasync, 97,5 Mo/s en lecture.',
            agent: 'Commande : meshfs mount --mountpoint ~/meshfs-live --data-dir /var/lib/meshfs-pool/data. Quota ENOSPC garanti fail-closed.',
          },
          {
            id: 'proxmox',
            title: '2. Plugin de Stockage Proxmox VE (PVE)',
            human: 'Remplacez les clusters Ceph lourds par MeshFS. Vos machines virtuelles et conteneurs Proxmox bénéficient d’un stockage partagé et répliqué avec zéro configuration complexe.',
            geek: 'Plugin Perl PVE::Storage::Custom::MeshFSPlugin.pm intégré dans /etc/pve/storage.cfg. Support des disques .raw/.qcow2, snapshots Merkle instantanés et migration à chaud < 450 ms.',
            agent: 'Storage definition: meshfs: shared-meshfs, path /mnt/pve/shared-meshfs, content images,rootdir, backup. Invariant shared 1.',
          },
          {
            id: 'podman',
            title: '3. Volumes Partagés Podman Rootless',
            human: 'Partagez des volumes de données entre conteneurs Podman sur plusieurs serveurs sans avoir à synchroniser des fichiers manuellement.',
            geek: 'Montage direct du pool CAS en lecture/écriture ou injection de répertoires matérialisés via meshfs-p2p export. Intégration transparente avec le driver Btrfs de Podman.',
            agent: 'podman run --rm -v /var/lib/meshfs-pool/data:/data:rw alpine sh. Confinement strict userns + cgroups v2.',
          },
        ],
      },
      install: {
        kicker: 'Installation & APT',
        title: 'Installez MeshFS en 3 Commandes sur Debian 13',
        human: 'Téléchargez les paquets officiels pré-compilés pour Debian 13 (Trixie) et Proxmox VE depuis notre dépôt sécurisé deb.xavdp.pro.',
        commands: [
          '# 1. Ajouter la clé GPG officielle',
          'curl -fsSL https://deb.xavdp.pro/keys/xavdp-archive-keyring.gpg | sudo tee /etc/apt/keyrings/xavdp.gpg > /dev/null',
          '# 2. Ajouter la source du dépôt Debian 13',
          'echo "deb [signed-by=/etc/apt/keyrings/xavdp.gpg] https://deb.xavdp.pro/podmesh trixie main" | sudo tee /etc/apt/sources.list.d/meshfs.list',
          '# 3. Mettre à jour et installer MeshFS et le plugin Proxmox',
          'sudo apt-get update && sudo apt-get install -y meshfs-p2p pve-storage-meshfs',
        ],
        githubRepo: 'https://github.com/xavdp-pro/podmesh-meshfs',
        debRepo: 'https://deb.xavdp.pro',
      },
    },
  },
  en: {
    hero: {
      kicker: 'Sovereign P2P Distributed Storage · Version 2.3.0',
      title: 'MeshFS: Distributed Storage Without the Monolithic Bloat.',
      subtitle:
        'Engineered for Linux workstations, Podman containers, and Proxmox VE hypervisors. 4MB CAS deduplication, WireGuard P2P gossip replication, and instant FUSE mounting with zero kernel modifications.',
      goldenQuote:
        '“Look at what the modern Linux kernel already offers natively and harness it without intermediaries.”',
      goldenAuthor: 'Shaper OS Fundamental Law',
      badgeStatus: 'Bare-Metal Qualified · 106 MB/s FUSE · 36 ms Reconstruction',
      btnQuickstart: 'Quickstart',
      btnUseCases: 'Explore Use Cases',
      btnDebRepo: 'Debian 13 APT Repository',
    },
    clarificationBanner: {
      title: 'Clarification & Didactic Mode',
      desc: 'First time here? Toggle Clarification Mode to display educational tooltips demystifying every technical term (CAS, Merkle, FUSE, FastCDC, P2P...).',
      activeLabel: 'Clarification Mode Active',
      inactiveLabel: 'Enable Clarification Mode',
    },
    audienceToggle: {
      human: '👤 For Humans (Simple & Direct)',
      geek: '⚡ For Geeks & Systems Engineers',
      agent: '🤖 AI Agent Protocol (Shaper OS)',
    },
    sections: {
      concepts: {
        kicker: 'Foundations & Concepts',
        title: 'Why MeshFS Succeeded by Assembling Proven Primitives',
        human: {
          lead: 'Traditional solutions like Ceph or Gluster require heavy clusters, fragile metadata servers, and out-of-tree kernel modules. MeshFS takes the orthogonal path.',
          points: [
            {
              title: 'Zero Central Server (No SPOF)',
              desc: 'Every machine is an autonomous peer. Your files remain available even if two-thirds of the nodes are offline.',
            },
            {
              title: 'Instant Global Deduplication',
              desc: 'If 10 virtual machines run the same Debian 13 base, identical blocks are stored only once across the whole cluster. Typical storage savings: 80% to 90%.',
            },
            {
              title: 'Mounts Like a Flash Drive',
              desc: 'With FUSE, your distributed storage appears as a regular folder (~/meshfs-live) right on your Linux desktop without needing root.',
            },
            {
              title: 'Silent Self-Healing',
              desc: 'Corrupted block? MeshFS detects it instantly via SHA-256 and retrieves the healthy chunk from a neighbor in 36 milliseconds.',
            },
          ],
        },
        geek: {
          lead: 'MeshFS composes the best proven Linux kernel primitives: FUSE 3, FastCDC, SHA-256 CAS, Merkle CoW, in-kernel WireGuard, and Btrfs.',
          specs: [
            { label: 'CAS Granularity', value: '4 MiB (dynamic FastCDC)' },
            { label: 'Integrity Check', value: 'Bit-exact SHA-256 digest per chunk' },
            { label: 'Measured FUSE Throughput', value: '106 MB/s (fdatasync wire saturation)' },
            { label: 'Underlying NVMe Speed', value: '895 MB/s on Btrfs storage' },
            { label: 'Chunk Reconstruction', value: '36 ms (direct P2P stream)' },
            { label: 'Self-Healing Duration', value: '0.64 s (16 MB corrupted payload healed)' },
            { label: 'Memory Footprint', value: '< 16 MB RAM per daemon' },
          ],
          codeTitle: 'CAS Pool Architecture (/var/lib/meshfs-pool)',
          code: `/var/lib/meshfs-pool/
├── cas_chunks/               # Immutable 4MB chunks keyed by lowercase SHA-256
│   ├── 0a4f89...7b2.chunk
│   ├── c9e31b...a10.chunk
│   └── ffe812...044.chunk
├── meta/                     # Merkle trees and sealed JSON manifests
│   └── manifests/
│       └── vm-101-disk.raw.json
└── data/                     # Clean user-facing POSIX directory exposed via FUSE
    ├── benchmarks/
    ├── config/
    └── documents/`,
        },
        agent: {
          lead: 'Deterministic formal specification for human-AI tandems under Shaper OS Rule 0G & Rule 38.',
          invariants: [
            'Invariant CAS-01: Every chunk C satisfies digest(C) == hex(SHA256(C.bytes)). Mismatches rejected immediately.',
            'Invariant COW-02: Atomic write sequence: write(tmp) -> fdatasync(tmp) -> rename(tmp, canonical) on same VFS.',
            'Invariant R38-03: Bounded repair loops k <= 2. Trips fail-closed circuit breaker upon second consecutive failure.',
            'Invariant NET-04: GEM-001 zero public WAN listening ports; all inter-node transit encapsulated in WireGuard wg0.',
          ],
          cliContract: `# Atomic file ingestion into CAS pool
meshfs-p2p write <source_path> <relative_volume_key>

# Deterministic assembly from Merkle root
meshfs-p2p read <merkle_root_sha256> <destination_path>

# Peer-to-peer LAN gossip convergence
meshfs-p2p sync`,
        },
      },
      genesis: {
        kicker: 'Origin & Philosophy',
        title: 'The Genesis Story: How PMBS Backup Birthed MeshFS',
        human: {
          lead: 'We never set out to invent a distributed filesystem from scratch. We simply needed to solve an urgent problem: create an indestructible, immutable container backup system.',
          story:
            'It started with PMBS (PodMesh Backup Server): to back up containers without ballooning disk usage, we sliced raw disks into deduplicated 4MB chunks, hashed them with SHA-256, and sealed them into Merkle trees. Once this engine was verified on real iron, the Shaper OS epiphany hit us: an immutable 4MB CAS backup tree, paired with P2P gossip and a FUSE mount layer... is no longer a dead cold archive: it is a living, distributed filesystem!',
        },
        geek: {
          lead: 'PMBS and MeshFS share identical data layouts. Zero re-encoding, zero format translation.',
          points: [
            'A 4MB CAS chunk written by an active container in MeshFS is immediately bit-compatible with cold PMBS backup datastores.',
            'P2P gossip pushes warm chunks between hypervisors while PMBS seals immutable Merkle checkpoints for long-term retention.',
            'The legacy barrier between active primary storage and external backup has been completely eliminated.',
          ],
        },
        agent: {
          contract: `{
  "subsystem": "MeshFS <-> PMBS Invariance",
  "block_size_bytes": 4194304,
  "hash_algorithm": "SHA-256",
  "metadata_format": "JSON-Merkle-v2",
  "atomic_swap": "POSIX renameat2(RENAME_NOREPLACE)",
  "posix_metadata": ["mode", "uid", "gid", "mtime", "size"]
}`,
        },
      },
      usecases: {
        kicker: 'Practical Use Cases',
        title: 'Battle-Tested on Real Iron',
        items: [
          {
            id: 'workstation',
            title: '1. Workstation & LXC Mount (FUSE)',
            human: 'Mount your distributed pool directly inside your home directory (~/meshfs-live) as an unprivileged user. Read and write at network wire speeds.',
            geek: 'FUSE 3 userland mount enforcing a strict 5.00 GB declared pool quota. Verified throughput: 106 MB/s synchronous writes, 97.5 MB/s reads.',
            agent: 'Execution: meshfs mount --mountpoint ~/meshfs-live --data-dir /var/lib/meshfs-pool/data. Quota ENOSPC fail-closed guaranteed.',
          },
          {
            id: 'proxmox',
            title: '2. Proxmox VE Storage Plugin (PVE)',
            human: 'Replace cumbersome Ceph clusters with MeshFS. Virtual machines and LXC containers access shared, replicated storage with zero friction.',
            geek: 'Native Perl plugin PVE::Storage::Custom::MeshFSPlugin.pm registered in /etc/pve/storage.cfg. Supports .raw/.qcow2 disk allocation, Merkle snapshots, and < 450 ms live migrations.',
            agent: 'PVE configuration: meshfs: shared-meshfs, path /mnt/pve/shared-meshfs, content images,rootdir, backup. Invariant shared 1.',
          },
          {
            id: 'podman',
            title: '3. Rootless Podman Shared Volumes',
            human: 'Share persistent volumes across multiple Podman nodes without manual rsync or external NFS servers.',
            geek: 'Direct CAS pool mounting or instant materialization via meshfs-p2p export. Seamless integration with Podman’s native Btrfs storage driver.',
            agent: 'podman run --rm -v /var/lib/meshfs-pool/data:/data:rw alpine sh. Full userns + cgroups v2 compliance.',
          },
        ],
      },
      install: {
        kicker: 'Installation & APT',
        title: 'Install MeshFS in 3 Commands on Debian 13',
        human: 'Download official signed packages for Debian 13 (Trixie) and Proxmox VE directly from our sovereign deb.xavdp.pro repository.',
        commands: [
          '# 1. Install official GPG archive signing key',
          'curl -fsSL https://deb.xavdp.pro/keys/xavdp-archive-keyring.gpg | sudo tee /etc/apt/keyrings/xavdp.gpg > /dev/null',
          '# 2. Add Debian 13 repository source',
          'echo "deb [signed-by=/etc/apt/keyrings/xavdp.gpg] https://deb.xavdp.pro/podmesh trixie main" | sudo tee /etc/apt/sources.list.d/meshfs.list',
          '# 3. Update index and install MeshFS + Proxmox plugin',
          'sudo apt-get update && sudo apt-get install -y meshfs-p2p pve-storage-meshfs',
        ],
        githubRepo: 'https://github.com/xavdp-pro/podmesh-meshfs',
        debRepo: 'https://deb.xavdp.pro',
      },
    },
  },
  es: {
    hero: {
      kicker: 'Almacenamiento Distribuido P2P Soberano · Versión 2.3.0',
      title: 'MeshFS: Almacenamiento Distribuido sin Sobrecarga Monolítica.',
      subtitle:
        'Diseñado para estaciones Linux, contenedores Podman e hipervisores Proxmox VE. Deduplicación CAS de 4 MB, replicación P2P cifrada con WireGuard y montaje FUSE instantáneo sin modificar el kernel.',
      goldenQuote:
        '«Mira lo que el núcleo Linux moderno ya ofrece de forma nativa y aprovéchalo sin intermediarios.»',
      goldenAuthor: 'Ley Fundamental de Shaper OS',
      badgeStatus: 'Validado en Hierro Real · 106 MB/s FUSE · 36 ms Reconstrucción',
      btnQuickstart: 'Inicio Rápido',
      btnUseCases: 'Ver Casos de Uso',
      btnDebRepo: 'Repositorio Debian 13 (APT)',
    },
    clarificationBanner: {
      title: 'Modo Aclaración & Didáctica',
      desc: '¿Primera vez aquí? Activa este modo para ver recuadros didácticos que explican de forma sencilla cada término técnico (CAS, Merkle, FUSE, FastCDC, P2P...).',
      activeLabel: 'Modo Aclaración Activado',
      inactiveLabel: 'Activar Modo Aclaración',
    },
    audienceToggle: {
      human: '👤 Para Todos (Simple y Claro)',
      geek: '⚡ Para Geeks e Ingenieros',
      agent: '🤖 Protocolo Agente IA (Shaper OS)',
    },
    sections: {
      concepts: {
        kicker: 'Fundamentos y Conceptos',
        title: 'Por Qué MeshFS Triunfa Combinando Primitivas Probadas',
        human: {
          lead: 'Las soluciones convencionales como Ceph o Gluster exigen clústeres masivos y módulos de kernel complejos. MeshFS adopta un camino diametralmente opuesto.',
          points: [
            {
              title: 'Cero Servidor Central (Sin SPOF)',
              desc: 'Todas las máquinas son iguales. Los archivos siguen disponibles aunque la mayoría de los nodos estén apagados.',
            },
            {
              title: 'Deduplicación Instantánea',
              desc: 'Si 10 máquinas virtuales comparten la misma base Debian 13, los bloques idénticos solo se almacenan una vez. Ahorro de espacio típico: 80% a 90%.',
            },
            {
              title: 'Se Monta Como una Memoria USB',
              desc: 'Gracias a FUSE, el almacenamiento distribuido aparece como una carpeta normal (~/meshfs-live) en tu escritorio Linux.',
            },
            {
              title: 'Auto-curación Silenciosa',
              desc: '¿Un bloque dañado? MeshFS lo detecta por SHA-256 y lo recupera de otro nodo en 36 milisegundos.',
            },
          ],
        },
        geek: {
          lead: 'MeshFS ensambla lo mejor de Linux: FUSE 3, FastCDC, SHA-256 CAS, Merkle CoW, WireGuard en kernel y Btrfs.',
          specs: [
            { label: 'Granularidad CAS', value: '4 MiB (FastCDC dinámico)' },
            { label: 'Firma de Integridad', value: 'SHA-256 exacto por bloque' },
            { label: 'Rendimiento FUSE medido', value: '106 MB/s (fdatasync saturación de red)' },
            { label: 'Velocidad NVMe base', value: '895 MB/s en Btrfs' },
            { label: 'Reconstrucción de bloque', value: '36 ms (stream directo P2P)' },
            { label: 'Tiempo de auto-curación', value: '0.64 s (reparación de 16 MB)' },
            { label: 'Huella de Memoria', value: '< 16 MB RAM por daemon' },
          ],
          codeTitle: 'Estructura del Almacén CAS (/var/lib/meshfs-pool)',
          code: `/var/lib/meshfs-pool/
├── cas_chunks/               # Bloques inmutables de 4 MB con hash SHA-256
│   ├── 0a4f89...7b2.chunk
│   ├── c9e31b...a10.chunk
│   └── ffe812...044.chunk
├── meta/                     # Árboles de Merkle y manifiestos sellados
│   └── manifests/
│       └── vm-101-disk.raw.json
└── data/                     # Directorio POSIX expuesto al usuario vía FUSE
    ├── benchmarks/
    ├── config/
    └── documents/`,
        },
        agent: {
          lead: 'Especificación determinista para tándems Humano-IA bajo Shaper OS Regla 0G y Regla 38.',
          invariants: [
            'Invariante CAS-01: Todo chunk C verifica digest(C) == hex(SHA256(C.bytes)).',
            'Invariante COW-02: Escritura atómica vía staging tmp -> rename(tmp, final).',
            'Invariante R38-03: Bucle de reparación acotado k <= 2. Parada segura en el segundo intento.',
            'Invariante NET-04: GEM-001 cero puertos públicos WAN; tráfico exclusivamente por WireGuard wg0.',
          ],
          cliContract: `# Ingesta atómica de archivo en el almacén CAS
meshfs-p2p write <source_path> <relative_volume_key>

# Ensamblado determinista desde raíz Merkle
meshfs-p2p read <merkle_root_sha256> <destination_path>

# Sincronización P2P en red local
meshfs-p2p sync`,
        },
      },
      genesis: {
        kicker: 'Origen y Filosofía',
        title: 'La Génesis: Cómo las Copias de Seguridad de PMBS Crearon MeshFS',
        human: {
          lead: 'No buscábamos inventar un sistema de archivos distribuido desde cero. Solo queríamos crear el sistema de copias de seguridad de contenedores más indestructible del mundo.',
          story:
            'Todo comenzó con PMBS (PodMesh Backup Server): para respaldar contenedores sin desperdiciar disco, dividimos las imágenes en bloques de 4 MB deduplicados, con hash SHA-256 y sellados en árboles de Merkle. Una vez validado en el hierro real, surgió la iluminación de Shaper OS: un archivo inmutable de 4 MB con P2P y montaje FUSE... ¡no es una copia muerta, es un sistema de archivos distribuido vivo!',
        },
        geek: {
          lead: 'PMBS y MeshFS comparten la misma estructura de datos. Cero conversión de formatos.',
          points: [
            'Un bloque de 4 MB escrito por un contenedor en MeshFS es nativamente compatible con el almacén PMBS.',
            'El protocolo P2P propaga los bloques activos entre hipervisores mientras PMBS archiva las raíces de Merkle.',
            'La barrera histórica entre almacenamiento activo y copias de seguridad ha desaparecido por completo.',
          ],
        },
        agent: {
          contract: `{
  "subsystem": "MeshFS <-> PMBS Invariance",
  "block_size_bytes": 4194304,
  "hash_algorithm": "SHA-256",
  "metadata_format": "JSON-Merkle-v2",
  "atomic_swap": "POSIX renameat2(RENAME_NOREPLACE)",
  "posix_metadata": ["mode", "uid", "gid", "mtime", "size"]
}`,
        },
      },
      usecases: {
        kicker: 'Casos de Uso Prácticos',
        title: 'Probado y Certificado en Hierro Real',
        items: [
          {
            id: 'workstation',
            title: '1. Montaje en Estación de Trabajo & LXC (FUSE)',
            human: 'Monte el almacenamiento distribuido en su carpeta personal (~/meshfs-live) como usuario normal, sin contraseñas de administrador.',
            geek: 'Montaje FUSE 3 en espacio de usuario con cuota estricta de 5,00 GB. Velocidad verificada: 106 MB/s en escritura síncrona, 97,5 MB/s en lectura.',
            agent: 'Ejecución: meshfs mount --mountpoint ~/meshfs-live --data-dir /var/lib/meshfs-pool/data.',
          },
          {
            id: 'proxmox',
            title: '2. Complemento de Almacenamiento Proxmox VE (PVE)',
            human: 'Sustituya clústeres Ceph pesados por MeshFS. Sus máquinas virtuales y contenedores LXC disfrutan de almacenamiento compartido sin complicaciones.',
            geek: 'Plugin Perl PVE::Storage::Custom::MeshFSPlugin.pm en /etc/pve/storage.cfg. Admite discos .raw/.qcow2, instantáneas Merkle y migraciones en vivo < 450 ms.',
            agent: 'Configuración PVE: meshfs: shared-meshfs, path /mnt/pve/shared-meshfs, content images,rootdir, backup. Invariante shared 1.',
          },
          {
            id: 'podman',
            title: '3. Volúmenes Compartidos Podman Rootless',
            human: 'Comparta volúmenes persistentes entre contenedores Podman en múltiples servidores sin herramientas de sincronización manual.',
            geek: 'Montaje directo del pool CAS en lectura/escritura o exportación mediante meshfs-p2p export. Compatible al 100% con el controlador Btrfs.',
            agent: 'podman run --rm -v /var/lib/meshfs-pool/data:/data:rw alpine sh.',
          },
        ],
      },
      install: {
        kicker: 'Instalación & APT',
        title: 'Instale MeshFS en 3 Comandos en Debian 13',
        human: 'Descargue paquetes oficiales firmados para Debian 13 (Trixie) y Proxmox VE desde nuestro repositorio deb.xavdp.pro.',
        commands: [
          '# 1. Instalar la clave oficial GPG del repositorio',
          'curl -fsSL https://deb.xavdp.pro/keys/xavdp-archive-keyring.gpg | sudo tee /etc/apt/keyrings/xavdp.gpg > /dev/null',
          '# 2. Agregar el repositorio de Debian 13',
          'echo "deb [signed-by=/etc/apt/keyrings/xavdp.gpg] https://deb.xavdp.pro/podmesh trixie main" | sudo tee /etc/apt/sources.list.d/meshfs.list',
          '# 3. Actualizar e instalar MeshFS y el plugin Proxmox',
          'sudo apt-get update && sudo apt-get install -y meshfs-p2p pve-storage-meshfs',
        ],
        githubRepo: 'https://github.com/xavdp-pro/podmesh-meshfs',
        debRepo: 'https://deb.xavdp.pro',
      },
    },
  },
}
