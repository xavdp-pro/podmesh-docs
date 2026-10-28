/**
 * Trilingual (FR / EN / ES) content for the MeshFS Universal Comparison Page
 * (https://meshfs.xavdp.pro/comparatif)
 *
 * Compares MeshFS v2.3.0 (+ podmesh-meshfs-s3 + podmesh-pmbs) against everything
 * that resembles it closely or from afar across 5 technological families (12 ecosystems),
 * with 3 reading levels (Human / Sysadmin Geek / AI Agent).
 */

export const meshfsComparisonContent = {
  fr: {
    nav: {
      home: 'Accueil MeshFS',
      compare: 'Comparatif Universel',
      pmbs: 'PMBS Backup',
      podmesh: 'Portail PodMesh',
    },
    hero: {
      kicker: 'Panorama Comparatif Universel · MeshFS v2.3.0',
      title: 'Tout ce qui ressemble à MeshFS (de près ou de loin).',
      subtitle:
        'Systèmes distribués (Ceph, Gluster, LINSTOR), stockage objet S3 & P2P (Cubbit, MinIO, Garage, IPFS), moteurs Kubernetes (Longhorn), sauvegardes CAS (Proxmox Backup Server, Borg, Restic) et synchroniseurs (Syncthing, ZFS/Btrfs) : pourquoi aucun n’unifiait les 6 mondes sur un seul pool CAS 4 Mio en moins de 15 Mo de RAM.',
      badge: '12 Écosystèmes Comparés · 5 Familles Technologiques · Preuves sur le Fer (Debian 13)',
      backHome: 'Retour à l’accueil MeshFS',
      jumpMatrix: 'Voir la Matrice Globale',
    },
    unificationBanner: {
      kicker: 'La Singularité Architecturale de MeshFS v2.3.0',
      title: '1 Pool CAS Unique (FastCDC 4 Mio SHA-256) = 6 Usages Unifiés en Zéro-Copie',
      desc: 'Là où l’industrie vous oblige à empiler 4 ou 5 logiciels incompatibles qui dupliquent vos octets sur le disque et saturent votre RAM, MeshFS v2.3.0 partage la même brique mathématique immuable entre tous les protocoles :',
      pillars: [
        {
          code: '01 · POSIX / FUSE',
          title: 'Dossier Local & Workstation',
          detail: 'Montage FUSE 3 en espace utilisateur (106 Mo/s) sans module noyau risqué.',
        },
        {
          code: '02 · PROXMOX VE',
          title: 'Hyperviseur VM & LXC',
          detail: 'Plugin officiel PVE::Storage::Custom::MeshFSPlugin (disques raw/qcow2, snapshots O(1)).',
        },
        {
          code: '03 · PODMAN / DOCKER',
          title: 'Plugin Volume Natif',
          detail: 'Socket /run/docker/plugins/meshfs.sock (VolumeDriver v1.2) sans Kubernetes.',
        },
        {
          code: '04 · S3 SOUVERAIN',
          title: 'Satellite podmesh-meshfs-s3',
          detail: 'API S3 (:9000), WORM Object Lock, Multipart O(1), Quotas HTTP 507, URLs pré-signées.',
        },
        {
          code: '05 · BACKUP PMBS',
          title: 'Sauvegarde Zéro-Transfert',
          detail: 'Les chunks déjà présents dans MeshFS sont sauvegardés en 0 seconde dans PMBS.',
        },
        {
          code: '06 · P2P SELF-HEALING',
          title: 'Auto-Guérison & GC Universel',
          detail: 'Réparation automatique de bit-rot depuis les pairs WireGuard + Mark-and-Sweep GC.',
        },
      ],
    },
    filterLabels: {
      all: 'Tous les Systèmes (12)',
      distributed: '1. Stockage Distribué & Hyperviseurs',
      s3_p2p: '2. Objet S3 & Cloud P2P',
      containers: '3. Conteneurs & K8s',
      backup_cas: '4. Sauvegardes CAS (Filiation)',
      sync_local: '5. Sync P2P, FUSE-S3 & FS Locaux',
    },
    matrixSection: {
      kicker: 'Matrice de Confrontation Technique',
      title: 'Tableau Comparatif Synthétique (12 Solutions vs MeshFS v2.3.0)',
      caption: 'Comparaison factuelle des moteurs de stockage, S3, sauvegarde et P2P face à MeshFS v2.3.0',
      headers: [
        'Solution / Écosystème',
        'Famille & Proximité',
        'RAM & Langage',
        'Dédup CAS Universelle',
        'POSIX FUSE + Proxmox + Podman',
        'API S3 Native (WORM & Quotas)',
        'Auto-Guérison P2P Bit-Rot',
        'Souveraineté (0 Cloud Tiers)',
      ],
      rows: [
        {
          name: 'MeshFS v2.3.0 (+ S3 + PMBS)',
          isMeshfs: true,
          family: 'Référence Souveraine (Tout-en-un)',
          ram: 'Rust · ~12 Mo RAM',
          dedup: '✅ Oui (4 Mio SHA-256 inter-protocoles)',
          mounts: '✅ FUSE + Plugin PVE + Socket Podman',
          s3: '✅ Oui (:9000, WORM, Multipart O(1), 507)',
          heal: '✅ Auto-repair P2P sur lecture SHA-256',
          sovereignty: '✅ 100% On-Prem · 0 SPOF · WireGuard',
        },
        {
          name: 'Ceph (CephFS + RBD + RGW)',
          family: 'Concurrent Lourd Entreprise (70%)',
          ram: 'C++ · 8 à 32 Go RAM/nœud',
          dedup: '❌ Non (Réplication / Erasure Coding brut)',
          mounts: '⚠️ CephFS/RBD (Complexe, min 3 nœuds)',
          s3: '✅ Oui (via RADOS Gateway lourd)',
          heal: '✅ Scrubbing PG (lourd en I/O)',
          sovereignty: '✅ On-Prem mais usine à gaz (MON/OSD/MDS)',
        },
        {
          name: 'Cubbit DS3 / Storj',
          family: 'Cousin S3 P2P Géo-distribué (78%)',
          ram: 'Go/Node · Agent + Cloud Nexus',
          dedup: '❌ Non (Découpage Reed-Solomon par objet)',
          mounts: '❌ Non (Pas de plugin Proxmox ni Podman)',
          s3: '✅ Oui (S3 uniquement)',
          heal: '✅ Reconstruction Reed-Solomon P2P',
          sovereignty: '❌ Non (Dépend du SaaS externe Nexus/Tardigrade)',
        },
        {
          name: 'MinIO',
          family: 'Cousin S3 Auto-Hébergé (68%)',
          ram: 'Go · 500 Mo à 4 Go RAM',
          dedup: '❌ Non (Erasure Coding par objet)',
          mounts: '❌ Non (Pas de FUSE natif ni plugin PVE)',
          s3: '✅ Oui (S3 pur, WORM, Quotas)',
          heal: '✅ Bitrot healing sur disques locaux/pools',
          sovereignty: '⚠️ On-Prem mais licence AGPLv3 / retrait features UI',
        },
        {
          name: 'Garage (Deuxfleurs) / SeaweedFS',
          family: 'Cousin S3 Léger / P2P (75%)',
          ram: 'Rust (Garage) / Go · 50–300 Mo',
          dedup: '⚠️ Blocs S3 internes (Pas de CAS multi-usages)',
          mounts: '⚠️ FUSE (SeaweedFS) / Pas de plugin PVE natif',
          s3: '✅ Oui (S3 léger géo-distribué)',
          heal: '✅ Anti-entropie CRDT / Réplication',
          sovereignty: '✅ 100% Libre & Auto-hébergé',
        },
        {
          name: 'IPFS (Kubo / Cluster)',
          family: 'Cousin CAS Merkle P2P (74%)',
          ram: 'Go · 300 Mo à 2 Go RAM',
          dedup: '✅ Oui (Merkle DAG / CID SHA-256)',
          mounts: '⚠️ FUSE lecture seule / lent en écriture',
          s3: '❌ Non natif (nécessite passerelle externe)',
          heal: '✅ Échange Bitswap P2P',
          sovereignty: '⚠️ Orienté DHT publique, lent pour disques VM',
        },
        {
          name: 'GlusterFS / Lustre',
          family: 'Ancien Monde POSIX Distribué (55%)',
          ram: 'C · 1 à 8 Go RAM',
          dedup: '❌ Non (Fichiers entiers / shards)',
          mounts: '✅ FUSE / Client Noyau (Pas de plugin Podman)',
          s3: '❌ Non natif',
          heal: '⚠️ Self-heal sujet au split-brain',
          sovereignty: '⚠️ GlusterFS déprécié par Red Hat en 2024',
        },
        {
          name: 'LINSTOR / DRBD',
          family: 'Réplication Bloc Proxmox/K8s (60%)',
          ram: 'Java (Controller) + Module Noyau C',
          dedup: '❌ Non (Réplication bloc brute)',
          mounts: '✅ Proxmox & K8s (Mode bloc uniquement)',
          s3: '❌ Non',
          heal: '✅ Resynchronisation bloc DRBD',
          sovereignty: '⚠️ Nécessite module noyau DRBD9 + Controller Java',
        },
        {
          name: 'Longhorn / Rook-Ceph / OpenEBS',
          family: 'Stockage Kubernetes CSI (52%)',
          ram: 'Go · 2 à 10 Go RAM + Cluster K8s',
          dedup: '❌ Non (Snapshots blocs par volume)',
          mounts: '❌ Uniquement dans Kubernetes (Pas de Podman simple)',
          s3: '❌ Non (Sauf Rook-Ceph RGW)',
          heal: '✅ Rebuild de réplicas K8s',
          sovereignty: '❌ Prisonnier de la pile Kubernetes / etcd',
        },
        {
          name: 'Proxmox Backup Server (PBS)',
          family: 'Parent Génétique CAS 4 Mio (85%)',
          ram: 'Rust · 200 Mo à 2 Go RAM',
          dedup: '✅ Oui (Chunks 4 Mio SHA-256 .fidx/.didx)',
          mounts: '❌ Coffre froid (Pas de stockage VM vif ni Podman)',
          s3: '❌ Non (Pas de serveur S3)',
          heal: '⚠️ Verify job local (Pas de réparation P2P)',
          sovereignty: '✅ 100% On-Prem mais limité aux sauvegardes PVE',
        },
        {
          name: 'BorgBackup / Restic / Kopia',
          family: 'Cousins Sauvegarde CAS CLI (65%)',
          ram: 'Python/C ou Go · CLI ponctuel',
          dedup: '✅ Oui (CDC Content-Defined Chunking)',
          mounts: '⚠️ FUSE d’inspection d’archive uniquement',
          s3: '❌ Clients S3 (Ne sont pas serveurs S3)',
          heal: '❌ Pas de démon P2P auto-guérissant',
          sovereignty: '✅ 100% Libre (Outils d’archivage froid)',
        },
        {
          name: 'Syncthing',
          family: 'Cousin Synchronisation P2P (58%)',
          ram: 'Go · 60 à 400 Mo RAM',
          dedup: '⚠️ Échange de blocs mais duplique les fichiers entiers',
          mounts: '✅ Dossier local synchronisé (Pas de CAS ni PVE)',
          s3: '❌ Non',
          heal: '✅ Re-sync depuis les pairs',
          sovereignty: '✅ 100% P2P mais chaque nœud stocke tout en clair',
        },
        {
          name: 'ZFS / Btrfs (Locaux seuls) & JuiceFS',
          family: 'Socle Local CoW / FUSE Cloud (62%)',
          ram: 'Noyau Linux (Btrfs) / ARC ZFS (Go de RAM)',
          dedup: '⚠️ CoW local (ZFS dedup très coûteux en RAM)',
          mounts: '✅ FS local (MeshFS utilise Btrfs comme socle !)',
          s3: '❌ Non',
          heal: '⚠️ Scrub local uniquement (si RAID local)',
          sovereignty: '✅ Btrfs est l’allié local naturel de MeshFS',
        },
      ],
    },
    competitorsSection: {
      kicker: 'Analyse Détaillée par Écosystème',
      title: 'Radiographie Sans Concession : De Près ou De Loin',
      lead: 'Sélectionnez une famille ci-dessus ou changez le niveau de lecture (Humain / Sysadmin / Agent IA) pour inspecter exactement ce qui rapproche et ce qui distingue chaque technologie de MeshFS v2.3.0.',
      labels: {
        resemblance: 'Indice de proximité',
        whatItDoesWell: 'Ce qu’il fait très bien (Son point fort)',
        whereMeshFsWins: 'Pourquoi MeshFS v2.3.0 change la donne',
        verdict: 'Verdict Architectural',
      },
      items: [
        {
          id: 'ceph',
          name: '1. Ceph (CephFS + RBD + RADOS Gateway)',
          category: 'distributed',
          proximity: '70% · Le Géant Entreprise',
          badge: 'Stockage Distribué Lourd',
          whatItDoesWell:
            'Capable de gérer des pétaoctets sur 50 à 1000 serveurs avec intégration native dans Proxmox VE et OpenStack.',
          whereMeshFsWins:
            'Ceph est une cathédrale d’ingénierie mais un cauchemar sur 2 ou 3 nœuds : il exige des démons MON, MGR, OSD et MDS qui consomment des gigaoctets de RAM, un réseau 10/25 GbE dédié, et ne fait aucune déduplication CAS entre vos VMs, votre S3 et vos backups. MeshFS tourne dans 12 Mo de RAM dès 1 ou 2 nœuds.',
          human:
            'Ceph, c’est un semi-remorque de 40 tonnes : génial pour Amazon ou le CERN, mais ruineux et ingérable pour 2 ou 5 serveurs. MeshFS vous donne le partage de disques Proxmox, les dossiers partagés et le S3 sans l’usine à gaz.',
          geek:
            'Ceph sépare RADOS, RBD, CephFS et RGW sans déduplication globale par contenu (SHA-256). En cas de coupure électrique sur un cluster 3 nœuds, la perte du quorum MON/Paxos bloque les I/O. MeshFS utilise des chunks CAS 4 Mio immuables + bail Single-Writer à epoch monotone : zéro quorum lourd, réparation P2P directe en HTTP/UDS.',
          agent:
            'INVARIANT [CEPH-VS-MESHFS]: Ceph requires Paxos quorum (2n+1 MONs) and O(N) PG scrubbing. MeshFS enforces O(1) Merkle root verification, <15 MB RSS footprint, and unified SHA-256 CAS across FUSE, PVE, Podman, S3, and PMBS.',
        },
        {
          id: 'cubbit',
          name: '2. Cubbit DS3 & Storj',
          category: 's3_p2p',
          proximity: '78% · Le Cousin S3 P2P',
          badge: 'Cloud Objet P2P',
          whatItDoesWell:
            'Excellente approche de stockage S3 géo-distribué en pair-à-pair utilisant du découpage Reed-Solomon pour répartir les fragments entre plusieurs sites.',
          whereMeshFsWins:
            'Deux limites majeures chez Cubbit : (1) le coordinateur (« Nexus ») est un service SaaS externe propriétaire — si internet coupe ou si l’éditeur s’arrête, votre souveraineté disparaît ; (2) Cubbit ne fait QUE du S3. MeshFS est 100% autonome sur votre matériel (0 dépendance externe) et ses chunks S3 sont simultanément des fichiers POSIX FUSE, des volumes Podman et des sauvegardes PMBS.',
          human:
            'Cubbit ressemble beaucoup à MeshFS-S3 pour le côté pair-à-pair, mais son « cerveau » reste hébergé chez un fournisseur externe payant. MeshFS vous appartient à 100%, fonctionne même coupé d’Internet, et fait bien plus que du S3.',
          geek:
            'Cubbit DS3 repose sur un plan de contrôle centralisé SaaS (Nexus) et expose uniquement une passerelle S3. MeshFS-S3 partage directement `/var/lib/meshfs/cas` avec le démon POSIX/PVE/Podman, répare les chunks corrompus en P2P direct (`GET /cas/chunk/:hash`) sur WireGuard, et applique le Garbage Collector universel `meshfs-s3 gc`.',
          agent:
            'INVARIANT [CUBBIT-VS-MESHFS]: Cubbit depends on external SaaS control-plane (violates GEM-001 / Sovereign Autonomy). MeshFS-S3 runs 100% air-gapped or over WireGuard with shared local CAS and automatic SHA-256 peer self-healing.',
        },
        {
          id: 'pbs',
          name: '3. Proxmox Backup Server (PBS)',
          category: 'backup_cas',
          proximity: '85% · Le Parent Génétique Direct',
          badge: 'Ancêtre Spirituel CAS',
          whatItDoesWell:
            'L’inventeur brillant en Rust du découpage en chunks de 4 Mio hachés en SHA-256 avec index Merkle (.fidx / .didx) pour sauvegarder les VMs Proxmox.',
          whereMeshFsWins:
            'PBS est un coffre-fort froid : ses chunks dorment sur le disque en attendant une restauration. MeshFS est né d’une révélation : en branchant ces mêmes chunks de 4 Mio sur un moteur P2P, un pilote FUSE, un plugin Podman et une passerelle S3, l’archive froide devient un système de fichiers distribué vivant ! Et grâce à PMBS, la sauvegarde devient instantanée (Zero-Transit Backup).',
          human:
            'Proxmox Backup Server est le parent direct dont MeshFS a hérité l’ADN mathématique (les fameux blocs de 4 Mo). Mais là où PBS ne sert qu’à ranger des sauvegardes au garage, MeshFS fait rouler vos applications, vos conteneurs et votre S3 en direct sur ces mêmes blocs !',
          geek:
            'PBS impose du HTTP/2 + TLS sur TCP `:8007` même en local et ne propose ni stockage primaire VM, ni S3, ni plugin Docker/Podman, ni auto-guérison P2P entre nœuds. MeshFS + PMBS partagent `/var/lib/meshfs/cas` via socket Unix (`/var/lib/pmbs/pmbs.sock`) : une VM sur MeshFS est sauvegardée dans PMBS en O(1) sans recopier un seul chunk déjà existant.',
          agent:
            'INVARIANT [PBS-VS-MESHFS]: PBS is cold-storage only. MeshFS + PMBS unify live I/O and immutable backup over the exact same SHA-256 chunk store, reducing backup network transit to 0 bytes for unchanged chunks.',
        },
        {
          id: 'minio',
          name: '4. MinIO',
          category: 's3_p2p',
          proximity: '68% · La Référence S3 Auto-Hébergée',
          badge: 'Serveur S3 Pur',
          whatItDoesWell:
            'Serveur S3 ultra-rapide en Go, très répandu pour les lacs de données IA et les sauvegardes Restic/Veeam.',
          whereMeshFsWins:
            'MinIO ne fait pas de déduplication CAS inter-fichiers (si vous envoyez 20 fois la même image ISO ou le même modèle IA dans différents buckets, vous payez 20 fois l’espace disque), exige des disques dédiés en Erasure Coding, et a récemment retiré ses outils d’administration de sa version communautaire AGPLv3. `podmesh-meshfs-s3` déduplique nativement à 100% entre tous les buckets ET avec vos VMs/conteneurs.',
          human:
            'MinIO est un excellent serveur S3, mais il ne déduplique pas vos doublons et ne peut pas servir de disque pour vos machines virtuelles Proxmox ou vos conteneurs Podman. Avec MeshFS-S3, 10 copies d’un gros fichier ne prennent la place que d’une seule.',
          geek:
            'Sur notre qualification Stage 12 (`10.10.10.210`), `podmesh-meshfs-s3` atteint immédiatement un ratio de déduplication mesuré de `2.33x` sur `/metrics`, applique les quotas stricts (`HTTP 507 QuotaExceeded`), le verrouillage WORM (`Object Lock`), le Multipart Upload en $\\mathcal{O}(1)$ par concaténation de listes de hashes (zéro recopie disque !), et le GC universel.',
          agent:
            'INVARIANT [MINIO-VS-MESHFS-S3]: MinIO CompleteMultipartUpload is O(N) disk I/O with zero cross-object deduplication. MeshFS-S3 CompleteMultipartUpload is O(1) manifest seal with global 4 MiB SHA-256 deduplication.',
        },
        {
          id: 'garage',
          name: '5. Garage (Deuxfleurs) & SeaweedFS',
          category: 's3_p2p',
          proximity: '75% · Les Cousins S3 Légers & Libres',
          badge: 'S3 Auto-Hébergé Léger',
          whatItDoesWell:
            'Garage (écrit en Rust par le collectif Deuxfleurs) et SeaweedFS (Go) sont d’excellentes alternatives légères et résilientes à MinIO pour héberger du S3 sur de petits serveurs.',
          whereMeshFsWins:
            'Garage est un projet remarquable d’économie de ressources en Rust, très proche de la philosophie Shaper OS ! La différence clé : Garage est conçu exclusivement pour le protocole S3 (inspiré de Dynamo avec CRDTs), tandis que MeshFS unifie S3 + Plugin Proxmox VE + FUSE POSIX + Plugin Volume Podman (`meshfs.sock`) + Sauvegarde PMBS sur un même pool CAS dédupliqué.',
          human:
            'Garage est sans doute le cousin philosophique le plus sympathique de MeshFS dans le monde libre francophone (léger, en Rust, pensé pour l’auto-hébergement). MeshFS va plus loin en unifiant le S3 avec les machines virtuelles Proxmox, les conteneurs Podman et la sauvegarde PMBS.',
          geek:
            'Garage découpe les objets S3 en blocs internes mais n’expose ni VolumeDriver Docker/Podman (`/run/docker/plugins/meshfs.sock`), ni plugin Perl Proxmox VE (`PVE::Storage::Custom::MeshFSPlugin`), ni couplage zéro-copie avec un démon de backup POSIX bit-exact comme PMBS.',
          agent:
            'INVARIANT [GARAGE-VS-MESHFS]: Both are lightweight Rust daemons for self-hosted clusters; MeshFS extends the invariant from pure S3 to unified POSIX FUSE, Proxmox VE storage, Podman VolumeDriver v1.2, and PMBS.',
        },
        {
          id: 'ipfs',
          name: '6. IPFS (Kubo / IPFS Cluster)',
          category: 's3_p2p',
          proximity: '74% · Le Cousin Merkle DAG & P2P',
          badge: 'Web Décentralisé CAS',
          whatItDoesWell:
            'Pionnier mondial de l’adressage par le contenu (CID) et des arbres de Merkle distribués en P2P via libp2p et Bitswap.',
          whereMeshFsWins:
            'IPFS a été conçu pour publier des fichiers statiques sur un réseau mondial public lent (DHT), avec des blocs de 256 Ko qui génèrent d’énormes arbres de métadonnées et une consommation RAM/CPU élevée. MeshFS utilise des chunks de 4 Mio calibrés pour saturer le NVMe (895 Mo/s) et WireGuard sur réseau privé, avec gestion des fichiers mutables, quotas `HTTP 507`, WORM S3 et Garbage Collector multi-protocoles sûr.',
          human:
            'IPFS utilise la même magie mathématique que MeshFS (nommer les blocs par leur empreinte numérique), mais pour partager des fichiers publics sur Internet comme BitTorrent. MeshFS adapte cette force pour faire tourner vos serveurs privés, vos VMs et vos bases de données à pleine vitesse.',
          geek:
            'IPFS souffre de la lenteur de routage DHT/IPNS pour les données mutables et du surcoût des blocs de 256 KiB. MeshFS calibre ses chunks à 4 MiB, scelle les manifestes JSON en < 1 ms, chiffre le transport dans le noyau via WireGuard, et répare les corruptions disque en temps réel lors d’un simple `GET` ou `read()`.',
          agent:
            'INVARIANT [IPFS-VS-MESHFS]: IPFS targets public DHT content publishing (256 KiB blocks, high metadata overhead). MeshFS targets high-throughput private infrastructure (4 MiB chunks, O(1) mutable volume leases, HTTP 507 quotas, zero-downtime P2P bit-rot repair).',
        },
        {
          id: 'longhorn',
          name: '7. Longhorn, Rook-Ceph & OpenEBS (Stockage Conteneurs)',
          category: 'containers',
          proximity: '52% · Le Monde Kubernetes CSI',
          badge: 'Volumes Conteneurs',
          whatItDoesWell:
            'Permet d’attacher des volumes persistants répliqués à des conteneurs dans un cluster Kubernetes.',
          whereMeshFsWins:
            'Pour avoir un simple volume répliqué avec Longhorn ou Rook, vous êtes forcé d’installer tout Kubernetes (etcd, kube-apiserver, kubelet, CNI), ce qui dévore déjà 4 à 8 Go de RAM avant même de lancer votre premier conteneur ! MeshFS intègre nativement le socket `/run/docker/plugins/meshfs.sock` (protocole Docker/Podman VolumeDriver v1.2) : un simple `podman run -v mon-vol:/data --volume-driver meshfs` fonctionne sur une Debian 13 nue en 12 Mo de RAM.',
          human:
            'Longhorn et Rook vous obligent à construire une centrale nucléaire (Kubernetes) juste pour partager un dossier entre deux conteneurs. Avec MeshFS, Podman et Docker ont directement leur plugin de volume branché sur le stockage dédupliqué, sans aucune lourdeur.',
          geek:
            'Qualifié au Stage 14 : `/run/docker/plugins/meshfs.sock` et `/etc/docker/plugins/meshfs.spec` implémentent `Plugin.Activate`, `VolumeDriver.Create` (avec `-o size=20M` converti en quota CAS), `Mount` (matérialisation 4 Mio depuis le CAS) et `Unmount` (chunking FastCDC automatique + scellement Merkle `sha256:...`). Zéro Kubernetes requis.',
          agent:
            'INVARIANT [K8S-CSI-VS-MESHFS]: Longhorn/Rook require full Kubernetes + CSI control plane (>4 GB RAM). MeshFS natively serves Docker/Podman VolumeDriver v1.2 over `/run/docker/plugins/meshfs.sock` inside the 12 MB Rust daemon.',
        },
        {
          id: 'gluster_linstor',
          name: '8. GlusterFS, Lustre & LINSTOR / DRBD',
          category: 'distributed',
          proximity: '58% · Les Vétérans du Stockage Réseau',
          badge: 'POSIX & Réplication Bloc',
          whatItDoesWell:
            'GlusterFS a démocratisé le montage FUSE distribué ; LINSTOR/DRBD offre une réplication bloc synchrone très rapide au niveau du noyau Linux.',
          whereMeshFsWins:
            'GlusterFS a été officiellement abandonné par Red Hat (fin de vie) à cause de sa lourdeur et de ses split-brains chroniques. DRBD/LINSTOR nécessite de charger un module noyau externe hors-arbre (`drbd9`), un contrôleur Java lourd, et ne fait ni déduplication CAS, ni S3, ni sauvegarde intégrée. MeshFS utilise exclusivement les primitives natives du noyau Linux standard (FUSE 3, WireGuard, Btrfs) sans jamais risquer un Kernel Panic.',
          human:
            'GlusterFS appartient au passé (abandonné par Red Hat) et DRBD exige de modifier le cœur du noyau Linux sans offrir ni S3 ni déduplication. MeshFS respecte la règle d’or : utiliser uniquement ce que le noyau Linux offre déjà en standard, en toute sécurité.',
          geek:
            'Sous Règle 0G (« Regarde ce que le noyau Linux moderne offre déjà en natif »), aucun module noyau tiers (`kmod` hors mainline) n’est toléré. MeshFS combine l’espace utilisateur Rust + FUSE 3 avec un bail atomique Single-Writer à epoch monotone, évitant à la fois les split-brains de GlusterFS et la rigidité bloc de DRBD.',
          agent:
            'INVARIANT [GLUSTER-DRBD-VS-MESHFS]: Zero out-of-tree kernel modules. Single-Writer monotonic epoch leases prevent Gluster-style split-brain while providing CAS deduplication absent from DRBD.',
        },
        {
          id: 'borg_restic',
          name: '9. BorgBackup, Restic & Kopia',
          category: 'backup_cas',
          proximity: '65% · Les Artisans de la Déduplication CLI',
          badge: 'Sauvegarde CAS en Ligne de Commande',
          whatItDoesWell:
            'Outils remarquables et très populaires pour sauvegarder un serveur avec découpage CDC (Content-Defined Chunking) et chiffrement vers un dépôt distant ou S3.',
          whereMeshFsWins:
            'Borg, Restic et Kopia sont des outils de sauvegarde ponctuels : quand vous lancez un backup, ils doivent relire, hacher et découper vos fichiers avant de les envoyer sur le réseau. Dans l’écosystème MeshFS + PMBS, vos volumes de production vivent DÉJÀ sous forme de chunks CAS 4 Mio SHA-256 ! La sauvegarde est donc instantanée et locale, et par ailleurs `podmesh-meshfs-s3` peut aussi servir de cible S3 dédupliquée et verrouillée WORM pour vos anciens scripts Restic/Borg !',
          human:
            'Borg et Restic sont d’excellents outils de sauvegarde, mais ils travaillent « après coup ». Avec MeshFS, vos données sont déjà découpées et vérifiées en permanence pendant que vous travaillez. Et mieux encore : vous pouvez brancher Restic ou Borg sur MeshFS-S3 !',
          geek:
            'Double compatibilité gagnante : (1) En natif, PMBS remplace Borg/Restic avec une sauvegarde $\\mathcal{O}(1)$ Zero-Transit sur le pool CAS de MeshFS ; (2) Pour les parcs tiers utilisant déjà Restic/Kopia, `podmesh-meshfs-s3` fournit une cible S3 souveraine avec `Object Lock` WORM anti-ransomware et auto-guérison P2P.',
          agent:
            'INVARIANT [BORG-RESTIC-VS-MESHFS]: Borg/Restic re-chunk data at backup time. MeshFS maintains live data in 4 MiB CAS chunks continuously, and `podmesh-meshfs-s3` can also act as a WORM-protected S3 target for legacy Restic/Borg clients.',
        },
        {
          id: 'syncthing_juicefs_btrfs',
          name: '10. Syncthing, JuiceFS / S3FS & ZFS / Btrfs',
          category: 'sync_local',
          proximity: '60% · Les Briques Voisines & Complémentaires',
          badge: 'Sync P2P, Passerelles & FS Locaux',
          whatItDoesWell:
            'Syncthing synchronise des dossiers en P2P ; JuiceFS monte un S3 externe en FUSE avec Redis/Postgres ; Btrfs et ZFS protègent le disque physique local en Copy-on-Write.',
          whereMeshFsWins:
            'Syncthing recopie l’intégralité des fichiers sur chaque machine sans déduplication globale ni API S3/Proxmox. JuiceFS dépend d’un S3 externe ET d’une base de données externe (Redis/SQL). Quant à Btrfs, ce n’est pas un concurrent de MeshFS mais son meilleur allié : MeshFS s’appuie sur Btrfs en local pour le Copy-on-Write NVMe et lui ajoute la couche P2P multi-nœuds, la déduplication CAS 4 Mio inter-machines et la passerelle S3 !',
          human:
            'Syncthing est parfait pour synchroniser ses photos entre un PC et un téléphone, et Btrfs est le gardien idéal d’un disque dur unique. MeshFS prend le relais dès que vous voulez unir plusieurs serveurs, héberger des VMs Proxmox, des conteneurs Podman et du S3 sans dupliquer inutilement vos données.',
          geek:
            'Dans l’architecture Shaper OS (et `podmesh-installer`), Btrfs gère les sous-volumes locaux (`@meshfs_cas`, `@pmbs_backups`) avec checksums matériels NVMe, tandis que MeshFS apporte par-dessus la fédération P2P WireGuard, la déduplication CAS SHA-256 inter-nœuds, le VolumeDriver Podman et le serveur S3 WORM sans aucune base Redis/SQL externe.',
          agent:
            'INVARIANT [LOCAL-COW-PLUS-MESHFS]: Btrfs provides local disk CoW invariance; MeshFS layers distributed SHA-256 CAS, P2P self-healing, S3, and container/VM orchestration on top with zero external DB dependencies.',
        },
      ],
    },
    conclusionSection: {
      kicker: 'Synthèse Finale & Décision',
      title: 'Quand Choisir MeshFS v2.3.0 ?',
      cards: [
        {
          title: 'Choisissez Ceph ou MinIO Géant si…',
          desc: 'Vous gérez un datacenter de 100+ serveurs dédiés uniquement au stockage avec une équipe de 5 ingénieurs dédiés à plein temps et des baies 100 GbE.',
          tone: 'neutral',
        },
        {
          title: 'Choisissez MeshFS v2.3.0 (+ S3 + PMBS) si…',
          desc: 'Vous voulez une infrastructure souveraine, ultra-rapide et incassable de 1 à 50 nœuds (Debian 13, Proxmox VE, Podman) qui unifie vos VMs, vos conteneurs, votre S3 WORM et vos sauvegardes dédupliquées dans moins de 15 Mo de RAM, avec auto-guérison P2P et zéro dépendance cloud.',
          tone: 'emerald',
        },
      ],
    },
  },

  en: {
    nav: {
      home: 'MeshFS Home',
      compare: 'Universal Comparison',
      pmbs: 'PMBS Backup',
      podmesh: 'PodMesh Portal',
    },
    hero: {
      kicker: 'Universal Technical Comparison · MeshFS v2.3.0',
      title: 'Everything That Resembles MeshFS (Closely or From Afar).',
      subtitle:
        'Distributed filesystems (Ceph, Gluster, LINSTOR), S3 & P2P object stores (Cubbit, MinIO, Garage, IPFS), Kubernetes CSI engines (Longhorn), CAS backup vaults (Proxmox Backup Server, Borg, Restic), and P2P syncers (Syncthing, ZFS/Btrfs): why none of them unified all 6 worlds over a single 4 MiB CAS pool in under 15 MB of RAM.',
      badge: '12 Ecosystems Compared · 5 Tech Families · Iron-Proven on Debian 13',
      backHome: 'Back to MeshFS Home',
      jumpMatrix: 'Jump to Global Matrix',
    },
    unificationBanner: {
      kicker: 'The Architectural Singularity of MeshFS v2.3.0',
      title: '1 Shared CAS Pool (4 MiB FastCDC SHA-256) = 6 Unified Zero-Copy Workloads',
      desc: 'Where conventional stacks force you to pile up 4 or 5 incompatible daemons that duplicate your bytes on disk and exhaust your RAM, MeshFS v2.3.0 shares the exact same immutable cryptographic building block across every protocol:',
      pillars: [
        {
          code: '01 · POSIX / FUSE',
          title: 'Workstation & Linux Mount',
          detail: 'Userspace FUSE 3 mount (106 MB/s) with zero risky out-of-tree kernel modules.',
        },
        {
          code: '02 · PROXMOX VE',
          title: 'VM & LXC Hypervisor Storage',
          detail: 'Official PVE::Storage::Custom::MeshFSPlugin (raw/qcow2 disks, O(1) snapshots).',
        },
        {
          code: '03 · PODMAN / DOCKER',
          title: 'Native Volume Plugin',
          detail: 'Socket /run/docker/plugins/meshfs.sock (VolumeDriver v1.2) without Kubernetes.',
        },
        {
          code: '04 · SOVEREIGN S3',
          title: 'podmesh-meshfs-s3 Satellite',
          detail: 'S3 API (:9000), WORM Object Lock, O(1) Multipart, HTTP 507 Quotas, Presigned URLs.',
        },
        {
          code: '05 · PMBS BACKUP',
          title: 'Zero-Transit Backup',
          detail: 'Chunks already in MeshFS are backed up in 0 seconds inside PMBS.',
        },
        {
          code: '06 · P2P SELF-HEALING',
          title: 'Bit-Rot Repair & Universal GC',
          detail: 'Automatic P2P chunk healing over WireGuard + cross-protocol Mark-and-Sweep GC.',
        },
      ],
    },
    filterLabels: {
      all: 'All Systems (12)',
      distributed: '1. Distributed Storage & Hypervisors',
      s3_p2p: '2. S3 Object & P2P Cloud',
      containers: '3. Containers & K8s',
      backup_cas: '4. CAS Backups (Lineage)',
      sync_local: '5. P2P Sync, FUSE-S3 & Local FS',
    },
    matrixSection: {
      kicker: 'Technical Confrontation Matrix',
      title: 'Synthetic Comparison Table (12 Solutions vs MeshFS v2.3.0)',
      caption: 'Factual comparison of distributed storage, S3, backup, and P2P engines against MeshFS v2.3.0',
      headers: [
        'Solution / Ecosystem',
        'Family & Proximity',
        'RAM & Language',
        'Universal CAS Dedup',
        'POSIX FUSE + Proxmox + Podman',
        'Native S3 API (WORM & Quotas)',
        'P2P Bit-Rot Self-Healing',
        'Sovereignty (0 External Cloud)',
      ],
      rows: [
        {
          name: 'MeshFS v2.3.0 (+ S3 + PMBS)',
          isMeshfs: true,
          family: 'Sovereign Reference (All-in-One)',
          ram: 'Rust · ~12 MB RAM',
          dedup: '✅ Yes (4 MiB SHA-256 cross-protocol)',
          mounts: '✅ FUSE + PVE Plugin + Podman Socket',
          s3: '✅ Yes (:9000, WORM, O(1) Multipart, 507)',
          heal: '✅ Auto-repair from P2P peers on SHA-256 read',
          sovereignty: '✅ 100% On-Prem · 0 SPOF · WireGuard',
        },
        {
          name: 'Ceph (CephFS + RBD + RGW)',
          family: 'Heavy Enterprise Competitor (70%)',
          ram: 'C++ · 8 to 32 GB RAM/node',
          dedup: '❌ No (Raw replication / Erasure Coding)',
          mounts: '⚠️ CephFS/RBD (Complex, min 3 nodes)',
          s3: '✅ Yes (via heavy RADOS Gateway)',
          heal: '✅ PG Scrubbing (heavy I/O impact)',
          sovereignty: '✅ On-Prem but massive operational overhead',
        },
        {
          name: 'Cubbit DS3 / Storj',
          family: 'Geo-Distributed P2P S3 Cousin (78%)',
          ram: 'Go/Node · Agent + Cloud Nexus',
          dedup: '❌ No (Per-object Reed-Solomon)',
          mounts: '❌ No (No Proxmox or Podman plugin)',
          s3: '✅ Yes (S3 only)',
          heal: '✅ P2P Reed-Solomon reconstruction',
          sovereignty: '❌ No (Depends on external SaaS Nexus/Tardigrade)',
        },
        {
          name: 'MinIO',
          family: 'Self-Hosted S3 Cousin (68%)',
          ram: 'Go · 500 MB to 4 GB RAM',
          dedup: '❌ No (Per-object Erasure Coding)',
          mounts: '❌ No (No native FUSE or PVE plugin)',
          s3: '✅ Yes (Pure S3, WORM, Quotas)',
          heal: '✅ Bitrot healing across local drives',
          sovereignty: '⚠️ On-Prem but strict AGPLv3 / stripped admin UI',
        },
        {
          name: 'Garage (Deuxfleurs) / SeaweedFS',
          family: 'Lightweight S3 / P2P Cousin (75%)',
          ram: 'Rust (Garage) / Go · 50–300 MB',
          dedup: '⚠️ Internal S3 blocks (Not cross-protocol CAS)',
          mounts: '⚠️ FUSE (SeaweedFS) / No native PVE plugin',
          s3: '✅ Yes (Lightweight geo-distributed S3)',
          heal: '✅ CRDT anti-entropy / Replication',
          sovereignty: '✅ 100% Free & Self-Hosted',
        },
        {
          name: 'IPFS (Kubo / Cluster)',
          family: 'Merkle CAS P2P Cousin (74%)',
          ram: 'Go · 300 MB to 2 GB RAM',
          dedup: '✅ Yes (Merkle DAG / SHA-256 CIDs)',
          mounts: '⚠️ Read-heavy FUSE / slow mutable writes',
          s3: '❌ Not native (requires external gateway)',
          heal: '✅ Bitswap P2P block exchange',
          sovereignty: '⚠️ Public DHT focus, unsuitable for VM disks',
        },
        {
          name: 'GlusterFS / Lustre',
          family: 'Legacy Distributed POSIX (55%)',
          ram: 'C · 1 to 8 GB RAM',
          dedup: '❌ No (Whole files / shards)',
          mounts: '✅ FUSE / Kernel client (No Podman plugin)',
          s3: '❌ Not native',
          heal: '⚠️ Self-heal prone to split-brain',
          sovereignty: '⚠️ GlusterFS deprecated by Red Hat in 2024',
        },
        {
          name: 'LINSTOR / DRBD',
          family: 'Block Replication Proxmox/K8s (60%)',
          ram: 'Java Controller + C Kernel Module',
          dedup: '❌ No (Raw block replication)',
          mounts: '✅ Proxmox & K8s (Block mode only)',
          s3: '❌ No',
          heal: '✅ DRBD block resync',
          sovereignty: '⚠️ Requires out-of-tree DRBD9 kmod + Java controller',
        },
        {
          name: 'Longhorn / Rook-Ceph / OpenEBS',
          family: 'Kubernetes CSI Storage (52%)',
          ram: 'Go · 2 to 10 GB RAM + K8s Cluster',
          dedup: '❌ No (Per-volume block snapshots)',
          mounts: '❌ Kubernetes only (No standalone Podman)',
          s3: '❌ No (Except Rook-Ceph RGW)',
          heal: '✅ K8s replica rebuild',
          sovereignty: '❌ Locked into full Kubernetes / etcd stack',
        },
        {
          name: 'Proxmox Backup Server (PBS)',
          family: 'Direct Genetic Parent 4 MiB CAS (85%)',
          ram: 'Rust · 200 MB to 2 GB RAM',
          dedup: '✅ Yes (4 MiB SHA-256 chunks .fidx/.didx)',
          mounts: '❌ Cold vault only (No live VM or Podman storage)',
          s3: '❌ No (No S3 server)',
          heal: '⚠️ Local verify job (No P2P peer repair)',
          sovereignty: '✅ 100% On-Prem but restricted to PVE backups',
        },
        {
          name: 'BorgBackup / Restic / Kopia',
          family: 'CLI CAS Backup Cousins (65%)',
          ram: 'Python/C or Go · One-shot CLI',
          dedup: '✅ Yes (Content-Defined Chunking)',
          mounts: '⚠️ Archive inspection FUSE only',
          s3: '❌ S3 clients (Not S3 servers)',
          heal: '❌ No self-healing P2P daemon',
          sovereignty: '✅ 100% Free (Cold backup archives)',
        },
        {
          name: 'Syncthing',
          family: 'P2P File Sync Cousin (58%)',
          ram: 'Go · 60 to 400 MB RAM',
          dedup: '⚠️ Block transfer but duplicates full files',
          mounts: '✅ Local folder sync (No CAS or PVE plugin)',
          s3: '❌ No',
          heal: '✅ Re-syncs from peers',
          sovereignty: '✅ 100% P2P but every node stores full files',
        },
        {
          name: 'ZFS / Btrfs (Local) & JuiceFS',
          family: 'Local CoW Base / Cloud FUSE (62%)',
          ram: 'Linux Kernel (Btrfs) / ZFS ARC (GBs RAM)',
          dedup: '⚠️ Local CoW (ZFS online dedup needs massive RAM)',
          mounts: '✅ Local FS (MeshFS uses Btrfs underneath!)',
          s3: '❌ No',
          heal: '⚠️ Local scrub only (requires local RAID)',
          sovereignty: '✅ Btrfs is MeshFS’s natural local foundation',
        },
      ],
    },
    competitorsSection: {
      kicker: 'Deep-Dive Ecosystem Analysis',
      title: 'Uncompromising Breakdown: Closely or From Afar',
      lead: 'Filter by technology family above or switch the reading level (Human / Sysadmin / AI Agent) to inspect what connects and what separates each system from MeshFS v2.3.0.',
      labels: {
        resemblance: 'Proximity Index',
        whatItDoesWell: 'What It Does Well (Strengths)',
        whereMeshFsWins: 'Why MeshFS v2.3.0 Changes the Game',
        verdict: 'Architectural Verdict',
      },
      items: [
        {
          id: 'ceph',
          name: '1. Ceph (CephFS + RBD + RADOS Gateway)',
          category: 'distributed',
          proximity: '70% · The Enterprise Giant',
          badge: 'Heavy Distributed Storage',
          whatItDoesWell:
            'Scales to petabytes across 50 to 1,000 servers with first-class integration in Proxmox VE and OpenStack.',
          whereMeshFsWins:
            'Ceph is overkill for 2 to 10 nodes: it demands MON, MGR, OSD, and MDS daemons eating gigabytes of RAM, dedicated 10/25 GbE networks, and performs zero CAS deduplication across your VMs, S3 buckets, and backups. MeshFS runs in 12 MB of RAM starting from 1 or 2 nodes.',
          human:
            'Ceph is a 40-ton freight train: great for hyperscalers, painful for 2 to 5 servers. MeshFS gives you Proxmox shared disks, POSIX folders, and S3 without the operational bloat.',
          geek:
            'Ceph separates RADOS, RBD, CephFS, and RGW without content-addressed SHA-256 deduplication. MeshFS uses immutable 4 MiB CAS chunks + monotonic epoch Single-Writer leases: zero heavy Paxos quorum, direct P2P repair over HTTP/UDS.',
          agent:
            'INVARIANT [CEPH-VS-MESHFS]: Ceph requires Paxos quorum (2n+1 MONs) and O(N) PG scrubbing. MeshFS enforces O(1) Merkle root verification, <15 MB RSS footprint, and unified SHA-256 CAS across FUSE, PVE, Podman, S3, and PMBS.',
        },
        {
          id: 'cubbit',
          name: '2. Cubbit DS3 & Storj',
          category: 's3_p2p',
          proximity: '78% · The P2P S3 Cousin',
          badge: 'P2P Object Cloud',
          whatItDoesWell:
            'Clever peer-to-peer geo-distributed S3 storage using Reed-Solomon erasure coding across sites.',
          whereMeshFsWins:
            'Two fatal flaws in Cubbit: (1) its coordinator ("Nexus") is a proprietary external SaaS control plane — if WAN drops or the vendor shuts down, your sovereignty vanishes; (2) Cubbit ONLY does S3. MeshFS is 100% autonomous on your iron (0 external dependency) and its S3 chunks are simultaneously POSIX FUSE files, Podman volumes, and PMBS backups.',
          human:
            'Cubbit looks similar to MeshFS-S3 on the P2P side, but its "brain" lives on an external vendor’s cloud. MeshFS belongs 100% to you, works fully air-gapped, and does much more than S3.',
          geek:
            'Cubbit DS3 relies on a SaaS coordinator (Nexus) and only exposes S3. MeshFS-S3 directly shares `/var/lib/meshfs/cas` with the POSIX/PVE/Podman daemon, heals corrupted chunks peer-to-peer (`GET /cas/chunk/:hash`), and runs universal Mark-and-Sweep GC.',
          agent:
            'INVARIANT [CUBBIT-VS-MESHFS]: Cubbit depends on external SaaS control-plane (violates GEM-001). MeshFS-S3 runs 100% air-gapped or over WireGuard with shared local CAS and automatic SHA-256 peer self-healing.',
        },
        {
          id: 'pbs',
          name: '3. Proxmox Backup Server (PBS)',
          category: 'backup_cas',
          proximity: '85% · The Direct Genetic Parent',
          badge: 'Spiritual CAS Ancestor',
          whatItDoesWell:
            'Brilliant Rust implementation of 4 MiB SHA-256 chunking and Merkle indexes (.fidx / .didx) for Proxmox VM backups.',
          whereMeshFsWins:
            'PBS is a cold vault: its chunks sit idle waiting for a restore. MeshFS was born from a simple realization: by wiring those exact 4 MiB chunks to a P2P gossip engine, a FUSE driver, a Podman VolumePlugin, and an S3 gateway, cold backup transforms into a live distributed filesystem! And with PMBS, backups become instantaneous (Zero-Transit Backup).',
          human:
            'Proxmox Backup Server is the parent from which MeshFS inherited its 4 MB block DNA. Where PBS only stores cold backups in a vault, MeshFS runs your live VMs, containers, and S3 directly on those blocks!',
          geek:
            'PBS forces HTTP/2 + TLS over TCP `:8007` even locally and offers no primary VM storage, no S3, no Docker/Podman plugin, and no P2P self-healing. MeshFS + PMBS share `/var/lib/meshfs/cas` via Unix socket (`/var/lib/pmbs/pmbs.sock`): backing up a MeshFS volume into PMBS is O(1) with zero chunk copy.',
          agent:
            'INVARIANT [PBS-VS-MESHFS]: PBS is cold-storage only. MeshFS + PMBS unify live I/O and immutable backup over the exact same SHA-256 chunk store, reducing backup network transit to 0 bytes for unchanged chunks.',
        },
        {
          id: 'minio',
          name: '4. MinIO',
          category: 's3_p2p',
          proximity: '68% · The Self-Hosted S3 Standard',
          badge: 'Pure S3 Server',
          whatItDoesWell:
            'Fast Go-based S3 server widely used for AI data lakes and Restic/Veeam backups.',
          whereMeshFsWins:
            'MinIO performs zero cross-file CAS deduplication (uploading 20 identical VM images or datasets across buckets consumes 20x physical storage) and cannot mount as a Proxmox VM disk or Podman volume. `podmesh-meshfs-s3` deduplicates 100% natively across all buckets AND across your VMs/containers.',
          human:
            'MinIO is a fast S3 server, but it never deduplicates identical files and cannot power your Proxmox VMs or Podman volumes. With MeshFS-S3, 10 copies of a large file only consume the space of one.',
          geek:
            'In Stage 12 qualification (`10.10.10.210`), `podmesh-meshfs-s3` delivered a verified `2.33x` deduplication ratio on `/metrics`, strict bucket quotas (`HTTP 507 QuotaExceeded`), WORM Object Lock, O(1) Multipart Upload via hash-list sealing (zero disk copy!), and universal CAS GC.',
          agent:
            'INVARIANT [MINIO-VS-MESHFS-S3]: MinIO CompleteMultipartUpload is O(N) disk I/O with zero cross-object deduplication. MeshFS-S3 CompleteMultipartUpload is O(1) manifest seal with global 4 MiB SHA-256 deduplication.',
        },
        {
          id: 'garage',
          name: '5. Garage (Deuxfleurs) & SeaweedFS',
          category: 's3_p2p',
          proximity: '75% · Lightweight Open-Source S3 Cousins',
          badge: 'Lightweight Self-Hosted S3',
          whatItDoesWell:
            'Garage (written in Rust by Deuxfleurs) and SeaweedFS (Go) are great lightweight alternatives to MinIO for self-hosted S3.',
          whereMeshFsWins:
            'Garage shares MeshFS’s love for frugal Rust engineering! The difference: Garage is built specifically for S3 object storage, whereas MeshFS unifies S3 + Proxmox VE Plugin + POSIX FUSE + Podman VolumeDriver (`meshfs.sock`) + PMBS Backup over a single deduplicated CAS pool.',
          human:
            'Garage is a wonderful lightweight Rust S3 server. MeshFS goes further by unifying S3 with Proxmox virtual machines, Podman containers, and zero-copy backups.',
          geek:
            'Garage slices S3 objects internally but does not expose a Docker/Podman VolumeDriver (`/run/docker/plugins/meshfs.sock`), a Proxmox VE storage plugin (`PVE::Storage::Custom::MeshFSPlugin`), or zero-copy coupling with PMBS.',
          agent:
            'INVARIANT [GARAGE-VS-MESHFS]: Both are frugal Rust daemons; MeshFS extends the invariant from pure S3 to unified POSIX FUSE, Proxmox VE storage, Podman VolumeDriver v1.2, and PMBS.',
        },
        {
          id: 'ipfs',
          name: '6. IPFS (Kubo / IPFS Cluster)',
          category: 's3_p2p',
          proximity: '74% · The Merkle DAG & P2P Cousin',
          badge: 'Decentralized CAS Web',
          whatItDoesWell:
            'Pioneered content addressing (CIDs) and distributed Merkle trees over P2P libp2p/Bitswap.',
          whereMeshFsWins:
            'IPFS was built for publishing static files over a slow global public DHT using 256 KiB blocks (causing high metadata and RAM overhead). MeshFS uses 4 MiB chunks tuned to saturate NVMe (895 MB/s) and WireGuard over private meshes, with mutable volume leases, HTTP 507 quotas, S3 WORM, and safe multi-protocol GC.',
          human:
            'IPFS uses the same cryptographic naming concept as MeshFS, but for public web files. MeshFS adapts that mathematical power to run private servers, VMs, and containers at full NVMe speed.',
          geek:
            'IPFS struggles with mutable state latency (IPNS/DHT) and 256 KiB block overhead. MeshFS uses 4 MiB chunks, seals JSON Merkle manifests in < 1 ms, encrypts transit in-kernel via WireGuard, and heals disk bit-rot inline during standard `GET` or `read()` calls.',
          agent:
            'INVARIANT [IPFS-VS-MESHFS]: IPFS targets public DHT publishing (256 KiB blocks). MeshFS targets high-throughput private infrastructure (4 MiB chunks, O(1) mutable volume leases, HTTP 507 quotas, inline P2P bit-rot repair).',
        },
        {
          id: 'longhorn',
          name: '7. Longhorn, Rook-Ceph & OpenEBS (Container Storage)',
          category: 'containers',
          proximity: '52% · The Kubernetes CSI World',
          badge: 'Container Volumes',
          whatItDoesWell:
            'Provides replicated persistent volumes for containers inside a Kubernetes cluster.',
          whereMeshFsWins:
            'To get a replicated volume with Longhorn or Rook, you must run all of Kubernetes (etcd, apiserver, kubelet), burning 4 to 8 GB of RAM before launching a single app! MeshFS natively embeds `/run/docker/plugins/meshfs.sock` (VolumeDriver v1.2): a simple `podman run -v my-vol:/data --volume-driver meshfs` works on bare Debian 13 in 12 MB of RAM.',
          human:
            'Longhorn and Rook force you to run a nuclear power plant (Kubernetes) just to share a volume between containers. MeshFS gives Podman and Docker a native volume plugin right out of the box.',
          geek:
            'Qualified in Stage 14: `/run/docker/plugins/meshfs.sock` and `/etc/docker/plugins/meshfs.spec` implement `Plugin.Activate`, `VolumeDriver.Create` (`-o size=20M` mapped to CAS quota), `Mount` (4 MiB CAS materialization), and `Unmount` (automatic FastCDC chunking + Merkle sealing). Zero Kubernetes required.',
          agent:
            'INVARIANT [K8S-CSI-VS-MESHFS]: Longhorn/Rook require full Kubernetes + CSI control plane (>4 GB RAM). MeshFS natively serves Docker/Podman VolumeDriver v1.2 over `/run/docker/plugins/meshfs.sock` inside the 12 MB Rust daemon.',
        },
        {
          id: 'gluster_linstor',
          name: '8. GlusterFS, Lustre & LINSTOR / DRBD',
          category: 'distributed',
          proximity: '58% · Legacy Network Storage Veterans',
          badge: 'POSIX & Block Replication',
          whatItDoesWell:
            'GlusterFS popularized distributed FUSE mounts; LINSTOR/DRBD delivers fast kernel-level synchronous block replication.',
          whereMeshFsWins:
            'GlusterFS was officially retired by Red Hat due to split-brain fragility. DRBD/LINSTOR requires compiling an out-of-tree kernel module (`drbd9`) plus a heavy Java controller, with zero CAS deduplication or S3 support. MeshFS strictly uses mainline Linux kernel primitives (FUSE 3, WireGuard, Btrfs).',
          human:
            'GlusterFS is retired, and DRBD requires invasive kernel modules without offering S3 or deduplication. MeshFS uses standard mainline Linux primitives safely.',
          geek:
            'Under Shaper OS Rule 0G ("Look at what the modern Linux kernel already provides natively"), out-of-tree kernel modules are forbidden. MeshFS combines Rust userspace + FUSE 3 with monotonic epoch Single-Writer leases.',
          agent:
            'INVARIANT [GLUSTER-DRBD-VS-MESHFS]: Zero out-of-tree kernel modules. Single-Writer monotonic epoch leases prevent Gluster-style split-brain while providing CAS deduplication absent from DRBD.',
        },
        {
          id: 'borg_restic',
          name: '9. BorgBackup, Restic & Kopia',
          category: 'backup_cas',
          proximity: '65% · CLI Deduplication Craftsmen',
          badge: 'CLI CAS Backup',
          whatItDoesWell:
            'Excellent CLI backup tools using Content-Defined Chunking (CDC) and encryption toward remote or S3 repositories.',
          whereMeshFsWins:
            'Borg, Restic, and Kopia only chunk data when a backup job runs. In MeshFS + PMBS, your live production volumes ALREADY live as 4 MiB SHA-256 CAS chunks! Backups are therefore O(1) and zero-copy. Even better: `podmesh-meshfs-s3` can serve as a WORM-locked, deduplicated S3 backend for your existing Restic/Borg scripts!',
          human:
            'Borg and Restic are great backup tools, but they only work after the fact. With MeshFS, your live data is already chunked and verified continuously — and you can also point Restic or Borg to MeshFS-S3!',
          geek:
            'Dual win: (1) Natively, PMBS replaces Borg/Restic with O(1) Zero-Transit Backup over the shared MeshFS CAS pool; (2) For legacy hosts running Restic/Kopia, `podmesh-meshfs-s3` provides a sovereign WORM S3 target with P2P self-healing.',
          agent:
            'INVARIANT [BORG-RESTIC-VS-MESHFS]: Borg/Restic re-chunk data at backup time. MeshFS maintains live data in 4 MiB CAS chunks continuously, and `podmesh-meshfs-s3` can also act as a WORM-protected S3 target for legacy Restic/Borg clients.',
        },
        {
          id: 'syncthing_juicefs_btrfs',
          name: '10. Syncthing, JuiceFS / S3FS & ZFS / Btrfs',
          category: 'sync_local',
          proximity: '60% · Neighboring & Complementary Bricks',
          badge: 'P2P Sync, Gateways & Local CoW',
          whatItDoesWell:
            'Syncthing syncs folders peer-to-peer; JuiceFS mounts external S3 via Redis/SQL; Btrfs and ZFS protect local physical disks via Copy-on-Write.',
          whereMeshFsWins:
            'Syncthing duplicates full files on every device without global CAS deduplication or S3/Proxmox support. JuiceFS requires both an external S3 server AND an external Redis/PostgreSQL database. As for Btrfs, it is MeshFS’s best friend: MeshFS runs on top of local Btrfs subvolumes and adds P2P multi-node federation, cross-node 4 MiB CAS deduplication, Podman volumes, and S3!',
          human:
            'Syncthing is great for syncing laptop folders, and Btrfs is the ideal guardian of a single local drive. MeshFS steps in when you want to unite multiple servers, Proxmox VMs, Podman containers, and S3 without duplicating data.',
          geek:
            'In Shaper OS, Btrfs manages local NVMe subvolumes (`@meshfs_cas`, `@pmbs_backups`), while MeshFS layers WireGuard P2P federation, cross-node SHA-256 deduplication, the Podman VolumeDriver, and the WORM S3 gateway with zero external Redis/SQL dependencies.',
          agent:
            'INVARIANT [LOCAL-COW-PLUS-MESHFS]: Btrfs provides local disk CoW invariance; MeshFS layers distributed SHA-256 CAS, P2P self-healing, S3, and container/VM orchestration on top with zero external DB dependencies.',
        },
      ],
    },
    conclusionSection: {
      kicker: 'Final Synthesis & Decision Guide',
      title: 'When Should You Choose MeshFS v2.3.0?',
      cards: [
        {
          title: 'Choose Ceph or Giant MinIO if…',
          desc: 'You operate a 100+ node storage-only datacenter with a dedicated 5-person storage ops team and 100 GbE switches.',
          tone: 'neutral',
        },
        {
          title: 'Choose MeshFS v2.3.0 (+ S3 + PMBS) if…',
          desc: 'You want a sovereign, fast, unbreakable 1-to-50 node infrastructure (Debian 13, Proxmox VE, Podman) unifying VMs, containers, WORM S3, and deduplicated backups in under 15 MB of RAM, with P2P self-healing and zero cloud dependency.',
          tone: 'emerald',
        },
      ],
    },
  },

  es: {
    nav: {
      home: 'Inicio MeshFS',
      compare: 'Comparativa Universal',
      pmbs: 'PMBS Backup',
      podmesh: 'Portal PodMesh',
    },
    hero: {
      kicker: 'Panorama Comparativo Universal · MeshFS v2.3.0',
      title: 'Todo lo que se parece a MeshFS (de cerca o de lejos).',
      subtitle:
        'Sistemas distribuidos (Ceph, Gluster, LINSTOR), almacenamiento objeto S3 y P2P (Cubbit, MinIO, Garage, IPFS), motores Kubernetes (Longhorn), copias de seguridad CAS (Proxmox Backup Server, Borg, Restic) y sincronizadores (Syncthing, ZFS/Btrfs): por qué ninguno unificaba los 6 mundos sobre un único pool CAS de 4 MiB en menos de 15 MB de RAM.',
      badge: '12 Ecosistemas Comparados · 5 Familias Tecnológicas · Probado en Hierro Real (Debian 13)',
      backHome: 'Volver al Inicio de MeshFS',
      jumpMatrix: 'Ver Matriz Global',
    },
    unificationBanner: {
      kicker: 'La Singularidad Arquitectónica de MeshFS v2.3.0',
      title: '1 Pool CAS Único (FastCDC 4 MiB SHA-256) = 6 Usos Unificados Sin Copia',
      desc: 'Donde la industria obliga a apilar 4 o 5 programas incompatibles que duplican tus bytes y agotan tu RAM, MeshFS v2.3.0 comparte el mismo bloque criptográfico inmutable entre todos los protocolos:',
      pillars: [
        {
          code: '01 · POSIX / FUSE',
          title: 'Carpeta Local y Estación',
          detail: 'Montaje FUSE 3 en espacio de usuario (106 MB/s) sin módulos de kernel arriesgados.',
        },
        {
          code: '02 · PROXMOX VE',
          title: 'Hipervisor VM y LXC',
          detail: 'Plugin oficial PVE::Storage::Custom::MeshFSPlugin (discos raw/qcow2, snapshots O(1)).',
        },
        {
          code: '03 · PODMAN / DOCKER',
          title: 'Plugin de Volumen Nativo',
          detail: 'Socket /run/docker/plugins/meshfs.sock (VolumeDriver v1.2) sin Kubernetes.',
        },
        {
          code: '04 · S3 SOBERANO',
          title: 'Satélite podmesh-meshfs-s3',
          detail: 'API S3 (:9000), WORM Object Lock, Multipart O(1), Cuotas HTTP 507, URLs prefirmadas.',
        },
        {
          code: '05 · BACKUP PMBS',
          title: 'Copia de Seguridad Cero-Tránsito',
          detail: 'Los bloques ya presentes en MeshFS se respaldan en 0 segundos en PMBS.',
        },
        {
          code: '06 · P2P SELF-HEALING',
          title: 'Auto-Curación y GC Universal',
          detail: 'Reparación automática de bit-rot desde pares WireGuard + Mark-and-Sweep GC.',
        },
      ],
    },
    filterLabels: {
      all: 'Todos los Sistemas (12)',
      distributed: '1. Almacenamiento Distribuido e Hipervisores',
      s3_p2p: '2. Objeto S3 y Nube P2P',
      containers: '3. Contenedores y K8s',
      backup_cas: '4. Copias CAS (Linaje)',
      sync_local: '5. Sync P2P, FUSE-S3 y FS Locales',
    },
    matrixSection: {
      kicker: 'Matriz de Confrontación Técnica',
      title: 'Tabla Comparativa Sintética (12 Soluciones vs MeshFS v2.3.0)',
      caption: 'Comparación factual de motores de almacenamiento, S3, backup y P2P frente a MeshFS v2.3.0',
      headers: [
        'Solución / Ecosistema',
        'Familia y Proximidad',
        'RAM y Lenguaje',
        'Dedup CAS Universal',
        'POSIX FUSE + Proxmox + Podman',
        'API S3 Nativa (WORM y Cuotas)',
        'Auto-Curación P2P Bit-Rot',
        'Soberanía (0 Nube Externa)',
      ],
      rows: [
        {
          name: 'MeshFS v2.3.0 (+ S3 + PMBS)',
          isMeshfs: true,
          family: 'Referencia Soberana (Todo en Uno)',
          ram: 'Rust · ~12 MB RAM',
          dedup: '✅ Sí (4 MiB SHA-256 multi-protocolo)',
          mounts: '✅ FUSE + Plugin PVE + Socket Podman',
          s3: '✅ Sí (:9000, WORM, Multipart O(1), 507)',
          heal: '✅ Auto-reparación P2P al leer SHA-256',
          sovereignty: '✅ 100% On-Prem · 0 SPOF · WireGuard',
        },
        {
          name: 'Ceph (CephFS + RBD + RGW)',
          family: 'Competidor Pesado Empresarial (70%)',
          ram: 'C++ · 8 a 32 GB RAM/nodo',
          dedup: '❌ No (Replicación / Erasure Coding bruto)',
          mounts: '⚠️ CephFS/RBD (Complejo, mín. 3 nodos)',
          s3: '✅ Sí (vía RADOS Gateway pesado)',
          heal: '✅ PG Scrubbing (alto impacto I/O)',
          sovereignty: '✅ On-Prem pero muy pesado de operar',
        },
        {
          name: 'Cubbit DS3 / Storj',
          family: 'Primo S3 P2P Geodistribuido (78%)',
          ram: 'Go/Node · Agente + Cloud Nexus',
          dedup: '❌ No (Reed-Solomon por objeto)',
          mounts: '❌ No (Sin plugin Proxmox ni Podman)',
          s3: '✅ Sí (Solo S3)',
          heal: '✅ Reconstrucción Reed-Solomon P2P',
          sovereignty: '❌ No (Depende del SaaS externo Nexus/Tardigrade)',
        },
        {
          name: 'MinIO',
          family: 'Primo S3 Autoalojado (68%)',
          ram: 'Go · 500 MB a 4 GB RAM',
          dedup: '❌ No (Erasure Coding por objeto)',
          mounts: '❌ No (Sin FUSE nativo ni plugin PVE)',
          s3: '✅ Sí (S3 puro, WORM, Cuotas)',
          heal: '✅ Bitrot healing en discos locales',
          sovereignty: '⚠️ On-Prem pero licencia AGPLv3 / recorte UI',
        },
        {
          name: 'Garage (Deuxfleurs) / SeaweedFS',
          family: 'Primo S3 Ligero / P2P (75%)',
          ram: 'Rust (Garage) / Go · 50–300 MB',
          dedup: '⚠️ Bloques S3 internos (No CAS multi-uso)',
          mounts: '⚠️ FUSE (SeaweedFS) / Sin plugin PVE nativo',
          s3: '✅ Sí (S3 ligero geodistribuido)',
          heal: '✅ Anti-entropía CRDT / Replicación',
          sovereignty: '✅ 100% Libre y Autoalojado',
        },
        {
          name: 'IPFS (Kubo / Cluster)',
          family: 'Primo CAS Merkle P2P (74%)',
          ram: 'Go · 300 MB a 2 GB RAM',
          dedup: '✅ Sí (Merkle DAG / CID SHA-256)',
          mounts: '⚠️ FUSE lectura / lento en escritura mutable',
          s3: '❌ No nativo (requiere pasarela externa)',
          heal: '✅ Intercambio Bitswap P2P',
          sovereignty: '⚠️ Orientado a DHT pública, lento para VMs',
        },
        {
          name: 'GlusterFS / Lustre',
          family: 'Antiguo Mundo POSIX Distribuido (55%)',
          ram: 'C · 1 a 8 GB RAM',
          dedup: '❌ No (Archivos completos / shards)',
          mounts: '✅ FUSE / Cliente Kernel (Sin plugin Podman)',
          s3: '❌ No nativo',
          heal: '⚠️ Self-heal propenso a split-brain',
          sovereignty: '⚠️ GlusterFS retirado por Red Hat en 2024',
        },
        {
          name: 'LINSTOR / DRBD',
          family: 'Replicación de Bloques Proxmox/K8s (60%)',
          ram: 'Controlador Java + Módulo Kernel C',
          dedup: '❌ No (Replicación de bloques bruta)',
          mounts: '✅ Proxmox y K8s (Solo modo bloque)',
          s3: '❌ No',
          heal: '✅ Resincronización de bloques DRBD',
          sovereignty: '⚠️ Requiere módulo kernel DRBD9 + Controlador Java',
        },
        {
          name: 'Longhorn / Rook-Ceph / OpenEBS',
          family: 'Almacenamiento Kubernetes CSI (52%)',
          ram: 'Go · 2 a 10 GB RAM + Clúster K8s',
          dedup: '❌ No (Snapshots por volumen)',
          mounts: '❌ Solo Kubernetes (Sin Podman directo)',
          s3: '❌ No (Salvo Rook-Ceph RGW)',
          heal: '✅ Reconstrucción de réplicas K8s',
          sovereignty: '❌ Atado a toda la pila Kubernetes / etcd',
        },
        {
          name: 'Proxmox Backup Server (PBS)',
          family: 'Padre Genético CAS 4 MiB (85%)',
          ram: 'Rust · 200 MB a 2 GB RAM',
          dedup: '✅ Sí (Chunks 4 MiB SHA-256 .fidx/.didx)',
          mounts: '❌ Bóveda fría (Sin almacenamiento VM vivo ni Podman)',
          s3: '❌ No (Sin servidor S3)',
          heal: '⚠️ Verify local (Sin reparación P2P)',
          sovereignty: '✅ 100% On-Prem pero limitado a backups PVE',
        },
        {
          name: 'BorgBackup / Restic / Kopia',
          family: 'Primos de Copia CAS CLI (65%)',
          ram: 'Python/C o Go · CLI puntual',
          dedup: '✅ Sí (Content-Defined Chunking)',
          mounts: '⚠️ FUSE solo para inspeccionar archivos',
          s3: '❌ Clientes S3 (No son servidores S3)',
          heal: '❌ Sin demonio P2P auto-curativo',
          sovereignty: '✅ 100% Libre (Archivos de backup frío)',
        },
        {
          name: 'Syncthing',
          family: 'Primo de Sincronización P2P (58%)',
          ram: 'Go · 60 a 400 MB RAM',
          dedup: '⚠️ Transfiere bloques pero duplica archivos enteros',
          mounts: '✅ Carpeta local sincronizada (Sin CAS ni PVE)',
          s3: '❌ No',
          heal: '✅ Re-sincroniza desde pares',
          sovereignty: '✅ 100% P2P pero cada nodo guarda todo completo',
        },
        {
          name: 'ZFS / Btrfs (Locales) y JuiceFS',
          family: 'Base Local CoW / FUSE Cloud (62%)',
          ram: 'Kernel Linux (Btrfs) / ZFS ARC (GBs RAM)',
          dedup: '⚠️ CoW local (ZFS dedup consume mucha RAM)',
          mounts: '✅ FS local (¡MeshFS usa Btrfs como base!)',
          s3: '❌ No',
          heal: '⚠️ Scrub local únicamente (si hay RAID local)',
          sovereignty: '✅ Btrfs es el aliado local natural de MeshFS',
        },
      ],
    },
    competitorsSection: {
      kicker: 'Análisis Detallado por Ecosistema',
      title: 'Radiografía Sin Concesiones: De Cerca o De Lejos',
      lead: 'Filtra por familia tecnológica arriba o cambia el nivel de lectura (Humano / Sysadmin / Agente IA) para inspeccionar qué acerca y qué diferencia a cada tecnología de MeshFS v2.3.0.',
      labels: {
        resemblance: 'Índice de proximidad',
        whatItDoesWell: 'Lo que hace muy bien (Punto fuerte)',
        whereMeshFsWins: 'Por qué MeshFS v2.3.0 cambia las reglas',
        verdict: 'Veredicto Arquitectónico',
      },
      items: [
        {
          id: 'ceph',
          name: '1. Ceph (CephFS + RBD + RADOS Gateway)',
          category: 'distributed',
          proximity: '70% · El Gigante Empresarial',
          badge: 'Almacenamiento Distribuido Pesado',
          whatItDoesWell:
            'Gestiona petabytes en 50 a 1.000 servidores con integración nativa en Proxmox VE y OpenStack.',
          whereMeshFsWins:
            'Ceph es excesivo para 2 a 10 nodos: exige demonios MON, MGR, OSD y MDS que consumen gigabytes de RAM, redes dedicadas de 10/25 GbE, y no realiza deduplicación CAS entre VMs, S3 y backups. MeshFS corre en 12 MB de RAM desde 1 o 2 nodos.',
          human:
            'Ceph es un camión de 40 toneladas: genial para gigantes cloud, pero pesado para 2 a 5 servidores. MeshFS te da discos compartidos Proxmox, carpetas POSIX y S3 sin complejidad.',
          geek:
            'Ceph separa RADOS, RBD, CephFS y RGW sin deduplicación global SHA-256. MeshFS usa bloques CAS inmutables de 4 MiB + arrendamiento Single-Writer con época monótona y reparación P2P directa.',
          agent:
            'INVARIANT [CEPH-VS-MESHFS]: Ceph requires Paxos quorum (2n+1 MONs) and O(N) PG scrubbing. MeshFS enforces O(1) Merkle root verification, <15 MB RSS footprint, and unified SHA-256 CAS across FUSE, PVE, Podman, S3, and PMBS.',
        },
        {
          id: 'cubbit',
          name: '2. Cubbit DS3 y Storj',
          category: 's3_p2p',
          proximity: '78% · El Primo S3 P2P',
          badge: 'Nube de Objetos P2P',
          whatItDoesWell:
            'Excelente enfoque de almacenamiento S3 geodistribuido P2P usando Reed-Solomon entre sitios.',
          whereMeshFsWins:
            'Dos límites clave en Cubbit: (1) su coordinador («Nexus») es un SaaS externo propietario; (2) Cubbit SOLO hace S3. MeshFS es 100% autónomo en tu propio hardware y sus bloques S3 son simultáneamente archivos POSIX FUSE, volúmenes Podman y backups PMBS.',
          human:
            'Cubbit se parece a MeshFS-S3 en el lado P2P, pero su «cerebro» depende de un proveedor externo. MeshFS es 100% tuyo, funciona sin Internet y hace mucho más que S3.',
          geek:
            'Cubbit DS3 depende de un plano de control SaaS (Nexus) y solo expone S3. MeshFS-S3 comparte directamente `/var/lib/meshfs/cas`, repara bloques corruptos por P2P (`GET /cas/chunk/:hash`) y aplica el recolector de basura universal `meshfs-s3 gc`.',
          agent:
            'INVARIANT [CUBBIT-VS-MESHFS]: Cubbit depends on external SaaS control-plane (violates GEM-001). MeshFS-S3 runs 100% air-gapped or over WireGuard with shared local CAS and automatic SHA-256 peer self-healing.',
        },
        {
          id: 'pbs',
          name: '3. Proxmox Backup Server (PBS)',
          category: 'backup_cas',
          proximity: '85% · El Padre Genético Directo',
          badge: 'Ancestro Espiritual CAS',
          whatItDoesWell:
            'Brillante implementación en Rust de bloques de 4 MiB SHA-256 e índices Merkle (.fidx / .didx) para copias de VMs Proxmox.',
          whereMeshFsWins:
            'PBS es una bóveda fría: sus bloques duermen esperando una restauración. MeshFS nació al conectar esos mismos bloques de 4 MiB a un motor P2P, un controlador FUSE, un plugin Podman y una pasarela S3: ¡el backup frío se convierte en un sistema de archivos distribuido vivo!',
          human:
            'Proxmox Backup Server es el padre del que MeshFS heredó el ADN de bloques de 4 MB. Pero donde PBS solo guarda copias en frío, ¡MeshFS ejecuta tus VMs, contenedores y S3 en vivo sobre esos mismos bloques!',
          geek:
            'PBS impone HTTP/2 + TLS sobre TCP `:8007` incluso en local y no ofrece almacenamiento VM primario, ni S3, ni plugin Podman, ni auto-curación P2P. MeshFS + PMBS comparten `/var/lib/meshfs/cas` por socket Unix: respaldar un volumen MeshFS en PMBS es O(1) sin copiar bloques existentes.',
          agent:
            'INVARIANT [PBS-VS-MESHFS]: PBS is cold-storage only. MeshFS + PMBS unify live I/O and immutable backup over the exact same SHA-256 chunk store, reducing backup network transit to 0 bytes for unchanged chunks.',
        },
        {
          id: 'minio',
          name: '4. MinIO',
          category: 's3_p2p',
          proximity: '68% · El Estándar S3 Autoalojado',
          badge: 'Servidor S3 Puro',
          whatItDoesWell:
            'Servidor S3 muy rápido en Go, ampliamente usado para lagos de datos IA y backups.',
          whereMeshFsWins:
            'MinIO no hace deduplicación CAS entre archivos (subir 20 imágenes ISO iguales gasta 20 veces el disco) y no sirve como disco VM de Proxmox ni volumen Podman. `podmesh-meshfs-s3` deduplica al 100% entre todos los buckets Y con tus VMs/contenedores.',
          human:
            'MinIO es un gran servidor S3, pero no deduplica archivos repetidos ni puede alimentar tus máquinas virtuales Proxmox o contenedores Podman. Con MeshFS-S3, 10 copias de un archivo grande solo ocupan el espacio de una.',
          geek:
            'En la calificación Stage 12 (`10.10.10.210`), `podmesh-meshfs-s3` alcanzó un ratio de deduplicación de `2.33x` en `/metrics`, cuotas estrictas (`HTTP 507 QuotaExceeded`), bloqueo WORM, Multipart Upload en O(1) sin recopia en disco, y GC universal.',
          agent:
            'INVARIANT [MINIO-VS-MESHFS-S3]: MinIO CompleteMultipartUpload is O(N) disk I/O with zero cross-object deduplication. MeshFS-S3 CompleteMultipartUpload is O(1) manifest seal with global 4 MiB SHA-256 deduplication.',
        },
        {
          id: 'garage',
          name: '5. Garage (Deuxfleurs) y SeaweedFS',
          category: 's3_p2p',
          proximity: '75% · Los Primos S3 Ligeros y Libres',
          badge: 'S3 Autoalojado Ligero',
          whatItDoesWell:
            'Garage (en Rust por Deuxfleurs) y SeaweedFS (Go) son excelentes alternativas ligeras a MinIO para alojar S3.',
          whereMeshFsWins:
            'Garage comparte la filosofía sobria en Rust de MeshFS. La diferencia clave: Garage está diseñado exclusivamente para S3, mientras que MeshFS unifica S3 + Plugin Proxmox VE + FUSE POSIX + Plugin Volumen Podman (`meshfs.sock`) + Backup PMBS sobre el mismo pool CAS deduplicado.',
          human:
            'Garage es un excelente servidor S3 ligero en Rust. MeshFS va más allá unificando S3 con máquinas virtuales Proxmox, contenedores Podman y copias PMBS.',
          geek:
            'Garage divide objetos S3 internamente pero no expone VolumeDriver Docker/Podman (`/run/docker/plugins/meshfs.sock`), plugin Proxmox VE ni acoplamiento cero-copia con PMBS.',
          agent:
            'INVARIANT [GARAGE-VS-MESHFS]: Both are frugal Rust daemons; MeshFS extends the invariant from pure S3 to unified POSIX FUSE, Proxmox VE storage, Podman VolumeDriver v1.2, and PMBS.',
        },
        {
          id: 'ipfs',
          name: '6. IPFS (Kubo / IPFS Cluster)',
          category: 's3_p2p',
          proximity: '74% · El Primo Merkle DAG y P2P',
          badge: 'Web Descentralizada CAS',
          whatItDoesWell:
            'Pionero mundial del direccionamiento por contenido (CID) y árboles de Merkle distribuidos en P2P.',
          whereMeshFsWins:
            'IPFS fue diseñado para publicar archivos estáticos en una DHT pública lenta con bloques de 256 KiB. MeshFS utiliza bloques de 4 MiB calibrados para saturar NVMe (895 MB/s) y WireGuard en redes privadas, con volúmenes mutables, cuotas HTTP 507, WORM S3 y GC seguro.',
          human:
            'IPFS usa la misma magia matemática que MeshFS pero para archivos públicos en Internet. MeshFS adapta esa potencia para hacer funcionar tus servidores privados, VMs y contenedores a máxima velocidad.',
          geek:
            'IPFS sufre por la latencia DHT/IPNS en datos mutables y bloques de 256 KiB. MeshFS usa bloques de 4 MiB, sella manifiestos JSON en < 1 ms, cifra en el kernel con WireGuard y repara bit-rot en tiempo real durante una lectura `GET` o `read()`.',
          agent:
            'INVARIANT [IPFS-VS-MESHFS]: IPFS targets public DHT publishing (256 KiB blocks). MeshFS targets high-throughput private infrastructure (4 MiB chunks, O(1) mutable volume leases, HTTP 507 quotas, inline P2P bit-rot repair).',
        },
        {
          id: 'longhorn',
          name: '7. Longhorn, Rook-Ceph y OpenEBS (Contenedores)',
          category: 'containers',
          proximity: '52% · El Mundo Kubernetes CSI',
          badge: 'Volúmenes de Contenedores',
          whatItDoesWell:
            'Permite adjuntar volúmenes persistentes replicados a contenedores dentro de Kubernetes.',
          whereMeshFsWins:
            'Para tener un volumen replicado con Longhorn o Rook debes instalar todo Kubernetes (consumiendo 4 a 8 GB de RAM). MeshFS integra nativamente `/run/docker/plugins/meshfs.sock` (VolumeDriver v1.2): un simple `podman run -v mi-vol:/data --volume-driver meshfs` funciona en Debian 13 con 12 MB de RAM.',
          human:
            'Longhorn y Rook te obligan a montar una central nuclear (Kubernetes) solo para compartir una carpeta entre contenedores. MeshFS incluye su propio plugin nativo para Podman y Docker sin sobrecarga.',
          geek:
            'Calificado en Stage 14: `/run/docker/plugins/meshfs.sock` y `/etc/docker/plugins/meshfs.spec` implementan `Plugin.Activate`, `VolumeDriver.Create` (`-o size=20M`), `Mount` y `Unmount` (chunking FastCDC automático + sellado Merkle). Cero Kubernetes requerido.',
          agent:
            'INVARIANT [K8S-CSI-VS-MESHFS]: Longhorn/Rook require full Kubernetes + CSI control plane (>4 GB RAM). MeshFS natively serves Docker/Podman VolumeDriver v1.2 over `/run/docker/plugins/meshfs.sock` inside the 12 MB Rust daemon.',
        },
        {
          id: 'gluster_linstor',
          name: '8. GlusterFS, Lustre y LINSTOR / DRBD',
          category: 'distributed',
          proximity: '58% · Veteranos del Almacenamiento en Red',
          badge: 'POSIX y Replicación de Bloques',
          whatItDoesWell:
            'GlusterFS popularizó FUSE distribuido; LINSTOR/DRBD ofrece replicación síncrona de bloques a nivel de kernel.',
          whereMeshFsWins:
            'GlusterFS fue retirado oficialmente por Red Hat debido a sus split-brains. DRBD requiere un módulo de kernel externo (`drbd9`) y un controlador Java pesado, sin deduplicación CAS ni S3. MeshFS usa exclusivamente primitivas estándar del kernel Linux (FUSE 3, WireGuard, Btrfs).',
          human:
            'GlusterFS está retirado y DRBD exige modificar el kernel Linux sin ofrecer S3 ni deduplicación. MeshFS usa solo lo que el kernel Linux estándar ya ofrece con total seguridad.',
          geek:
            'Bajo la Regla 0G de Shaper OS, no se permiten módulos de kernel externos fuera de árbol. MeshFS combina espacio de usuario en Rust + FUSE 3 con arrendamientos Single-Writer de época monótona.',
          agent:
            'INVARIANT [GLUSTER-DRBD-VS-MESHFS]: Zero out-of-tree kernel modules. Single-Writer monotonic epoch leases prevent Gluster-style split-brain while providing CAS deduplication absent from DRBD.',
        },
        {
          id: 'borg_restic',
          name: '9. BorgBackup, Restic y Kopia',
          category: 'backup_cas',
          proximity: '65% · Artesanos de la Deduplicación CLI',
          badge: 'Copia de Seguridad CAS en CLI',
          whatItDoesWell:
            'Excelentes herramientas CLI para copias de seguridad con Content-Defined Chunking (CDC) y cifrado.',
          whereMeshFsWins:
            'Borg, Restic y Kopia solo trocean los datos cuando lanzas el backup. ¡En MeshFS + PMBS, tus volúmenes de producción YA viven como bloques CAS de 4 MiB SHA-256! Además, `podmesh-meshfs-s3` puede servir como destino S3 con bloqueo WORM para tus scripts Restic/Borg existentes.',
          human:
            'Borg y Restic son grandes herramientas de backup, pero trabajan «a posteriori». Con MeshFS tus datos ya están deduplicados y verificados en vivo — ¡y además puedes conectar Restic o Borg a MeshFS-S3!',
          geek:
            'Doble ventaja: (1) PMBS realiza copias O(1) Zero-Transit sobre el pool CAS de MeshFS; (2) `podmesh-meshfs-s3` ofrece un destino S3 soberano con bloqueo WORM anti-ransomware y auto-curación P2P para clientes Restic/Kopia.',
          agent:
            'INVARIANT [BORG-RESTIC-VS-MESHFS]: Borg/Restic re-chunk data at backup time. MeshFS maintains live data in 4 MiB CAS chunks continuously, and `podmesh-meshfs-s3` can also act as a WORM-protected S3 target for legacy Restic/Borg clients.',
        },
        {
          id: 'syncthing_juicefs_btrfs',
          name: '10. Syncthing, JuiceFS / S3FS y ZFS / Btrfs',
          category: 'sync_local',
          proximity: '60% · Piezas Vecinas y Complementarias',
          badge: 'Sync P2P, Pasarelas y FS Locales',
          whatItDoesWell:
            'Syncthing sincroniza carpetas P2P; JuiceFS monta S3 externo vía Redis/SQL; Btrfs y ZFS protegen el disco físico local en Copy-on-Write.',
          whereMeshFsWins:
            'Syncthing duplica archivos enteros en cada máquina sin deduplicación global ni S3/Proxmox. JuiceFS exige un S3 externo Y una base Redis/SQL externa. En cuanto a Btrfs, es el mejor aliado local de MeshFS: MeshFS se apoya en Btrfs localmente y le añade federación P2P WireGuard, deduplicación CAS entre nodos, volúmenes Podman y S3.',
          human:
            'Syncthing es genial para sincronizar carpetas entre ordenadores y Btrfs es el guardián ideal de un disco local. MeshFS entra en juego cuando quieres unir varios servidores, VMs Proxmox, contenedores Podman y S3 sin duplicar datos.',
          geek:
            'En Shaper OS, Btrfs gestiona los subvolúmenes NVMe locales (`@meshfs_cas`, `@pmbs_backups`), mientras MeshFS añade encima la federación P2P WireGuard, deduplicación SHA-256 entre nodos, el VolumeDriver Podman y la pasarela S3 WORM sin bases Redis/SQL externas.',
          agent:
            'INVARIANT [LOCAL-COW-PLUS-MESHFS]: Btrfs provides local disk CoW invariance; MeshFS layers distributed SHA-256 CAS, P2P self-healing, S3, and container/VM orchestration on top with zero external DB dependencies.',
        },
      ],
    },
    conclusionSection: {
      kicker: 'Síntesis Final y Guía de Decisión',
      title: '¿Cuándo Elegir MeshFS v2.3.0?',
      cards: [
        {
          title: 'Elige Ceph o MinIO Gigante si…',
          desc: 'Operas un centro de datos de más de 100 servidores dedicados exclusivamente al almacenamiento con un equipo de 5 ingenieros a tiempo completo y redes de 100 GbE.',
          tone: 'neutral',
        },
        {
          title: 'Elige MeshFS v2.3.0 (+ S3 + PMBS) si…',
          desc: 'Buscas una infraestructura soberana, ultrarrápida e indestructible de 1 a 50 nodos (Debian 13, Proxmox VE, Podman) que unifique VMs, contenedores, S3 WORM y backups deduplicados en menos de 15 MB de RAM, con auto-curación P2P y cero dependencia cloud.',
          tone: 'emerald',
        },
      ],
    },
  },
}
