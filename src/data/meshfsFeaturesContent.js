/**
 * Complete Trilingual (FR / EN / ES) Feature Catalog for MeshFS v2.3.0
 * (https://meshfs.xavdp.pro/fonctionnalites)
 *
 * Exhaustively documents all 28 features across 7 functional domains,
 * with 3 reading levels (Human / Geek Sysadmin / AI Agent) and CLI/API specs.
 */

export const meshfsFeaturesContent = {
  fr: {
    nav: {
      home: 'Accueil MeshFS',
      features: '28 Fonctionnalités',
      compare: 'Comparatif (12 vs MeshFS)',
      pmbs: 'PMBS Backup',
    },
    hero: {
      kicker: 'Catalogue Exhaustif des Capacités · MeshFS v2.3.0',
      title: 'Les 28 Fonctionnalités de l’Écosystème MeshFS.',
      subtitle:
        'Du découpage mathématique CAS 4 Mio SHA-256 jusqu’au satellite S3 WORM, au plugin de volume natif Podman/Docker, au pilote Proxmox VE, à l’auto-guérison P2P anti bit-rot et au Garbage Collector universel : chaque brique est qualifiée sur Debian 13.',
      badge: '28 Fonctionnalités Qualifiées · 7 Domaines · 14/14 Stages Labo PASS',
      searchPlaceholder: 'Rechercher une fonctionnalité (ex: S3, WORM, Podman, FUSE, bit-rot, quota, GC, Proxmox)...',
      expandSpecLabel: 'Commande CLI, API REST & Preuve Labo',
      copyBtn: 'Copier',
      copiedBtn: 'Copié !',
    },
    stats: [
      { value: '28', label: 'Fonctionnalités Natives' },
      { value: '4 Mio', label: 'Granularité CAS SHA-256' },
      { value: '< 15 Mo', label: 'Empreinte RAM Rust' },
      { value: '6-en-1', label: 'Protocoles Unifiés' },
    ],
    domainFilters: {
      all: 'Toutes (28)',
      cas_core: '1. Cœur CAS & Intégrité (4)',
      p2p_heal: '2. P2P & Auto-Guérison (4)',
      posix_fuse: '3. POSIX, FUSE & Volumes (4)',
      containers_pve: '4. Podman, Docker & Proxmox (4)',
      s3_satellite: '5. Satellite S3 & WORM (5)',
      governance_gc: '6. Quotas, GC & Métriques (3)',
      ai_packaging: '7. AI-First, Socket & Debian 13 (4)',
    },
    domains: [
      {
        id: 'cas_core',
        code: 'DOMAINE I',
        title: 'Moteur CAS & Intégrité Cryptographique',
        subtitle: 'Le socle immuable FastCDC / 4 Mio SHA-256 qui élimine toute corruption silencieuse.',
        features: [
          {
            code: 'F-01',
            title: 'Découpage CAS 4 Mio & Hachage SHA-256 Strict',
            badge: 'Socle Mathématique',
            human:
              'Chaque fichier est découpé en blocs de 4 Mo maximum. Le nom de chaque bloc est son empreinte numérique unique (SHA-256) : il est impossible de modifier un fichier sans que cela se voie immédiatement.',
            geek:
              'Segmentation déterministe à `4 194 304` octets (`CHUNK_SIZE = 4 MiB`). Chaque bloc est stocké dans une arborescence à 2 niveaux `/var/lib/meshfs/cas/<h[0..2]>/<h[2..4]>/<sha256>.chunk` pour garantir des accès répertoire en O(1) sur ext4/Btrfs.',
            agent:
              'INVARIANT [CAS-01]: Address(Chunk) === SHA256(Payload). Max chunk size = 4,194,304 bytes. Zero unverified byte write allowed.',
            cli: `# Inspection directe d'un chunk CAS sur le disque
ls -lh /var/lib/meshfs/cas/*/*/*.chunk | head -n 5
sha256sum /var/lib/meshfs/cas/e4/64/e4642606d0b7ecd7819728b4c3a87561d50235a4c1429814616ee4b6b6b18cf3.chunk`,
          },
          {
            code: 'F-02',
            title: 'Déduplication Globale Inter-Protocoles (Zéro-Copie)',
            badge: 'Gain 50% à 90%',
            human:
              'Si vous stockez la même image Debian dans 10 machines virtuelles Proxmox, dans 5 conteneurs Podman et dans un bucket S3, elle n’occupe la place que d’une seule copie sur le disque.',
            geek:
              'Pool CAS unique `/var/lib/meshfs/cas` partagé simultanément par `podmesh-meshfs` (POSIX/FUSE/PVE/Podman), `podmesh-meshfs-s3` (API S3) et `podmesh-pmbs` (Sauvegardes). Écriture court-circuitée si `chunk_path.exists()`.',
            agent:
              'INVARIANT [DEDUP-02]: Cross-protocol deduplication across Volumes, S3 Buckets, and PMBS Snapshots. DedupRatio = LogicalBytes / PhysicalCasBytes.',
            cli: `# Vérifier le gain de déduplication réel
meshfs status
meshfs-s3 status`,
          },
          {
            code: 'F-03',
            title: 'Scellement par Arbre de Merkle (merkle_root)',
            badge: 'Audit O(1)',
            human:
              'Chaque fichier et chaque volume possède un « sceau principal » qui résume tous ses morceaux. En vérifiant ce seul sceau en une milliseconde, on certifie que des téraoctets de données sont intacts.',
            geek:
              'Calcul hiérarchique de `merkle_root = sha256(h_1 : h_2 : ... : h_n)` inscrit dans chaque manifeste d’objet ou de volume. Utilisé également comme `ETag` cryptographique dans `podmesh-meshfs-s3`.',
            agent:
              'INVARIANT [MERKLE-03]: Volume and S3 Object manifests seal ordered chunk lists into a deterministic SHA-256 Merkle root verifiable in O(1).',
            cli: `# Vérifier l'intégrité Merkle complète de tous les volumes et chunks
meshfs verify`,
          },
          {
            code: 'F-04',
            title: 'Écriture Atomique POSIX Anti-Corruption (Temp-to-Final)',
            badge: 'Fail-Closed',
            human:
              'Même si vous débranchez la prise électrique du serveur au milieu d’un enregistrement, vos fichiers existants ne sont jamais corrompus ni coupés en deux.',
            geek:
              'Écriture dans `/var/lib/meshfs/staging/.tmp-<uuid>` avec `O_NOFOLLOW`, permissions `0600`/`0700`, appel noyau `file.sync_all()`, puis `fs::rename()` atomique POSIX et `sync_all()` du répertoire parent.',
            agent:
              'INVARIANT [ATOMIC-04]: All chunk and manifest mutations execute temp-write -> fsync(fd) -> atomic rename -> fsync(parent_dir).',
            cli: `# Statut de santé et vérification des manifestes atomiques
curl -s --unix-socket /var/lib/meshfs/meshfs.sock http://localhost/status | jq .`,
          },
        ],
      },
      {
        id: 'p2p_heal',
        code: 'DOMAINE II',
        title: 'Réseau P2P, Auto-Guérison & Consensus Léger',
        subtitle: 'Zéro serveur central (0 SPOF) et réparation automatique silencieuse des pannes disque.',
        features: [
          {
            code: 'F-05',
            title: 'Auto-Guérison P2P Transparente sur Bit-Rot (Self-Healing)',
            badge: 'Qualifié Stage 13',
            human:
              'Si un secteur de votre disque dur s’abîme silencieusement (« bit-rot »), MeshFS s’en aperçoit à la lecture, récupère immédiatement le bon morceau chez un serveur voisin et répare votre disque sans erreur.',
            geek:
              'Dans `ChunkStore::read_chunk`, si le fichier local est absent ou si `SHA256(disk_bytes) != expected_hash`, le nœud interroge ses pairs (`MESHFS_PEERS`) sur `GET /cas/chunk/:hash`, vérifie le SHA-256 reçu, réécrit atomiquement le chunk sur disque et incrémente `self_healed_chunks`.',
            agent:
              'INVARIANT [HEAL-05]: On local missing/corrupted chunk read, automatically fetch from peers, verify SHA-256, atomically repair local disk, and increment self_healed_chunks_total.',
            cli: `# Route pair-à-pair d'échange et de réparation de chunk CAS
curl -I http://10.10.10.211:9000/cas/chunk/e4642606d0b7ecd7819728b4c3a87561d50235a4c1429814616ee4b6b6b18cf3
curl -s http://127.0.0.1:9000/metrics | grep self_healed_chunks_total`,
          },
          {
            code: 'F-06',
            title: 'Maillage P2P sur WireGuard Kernel (Doctrine GEM-001)',
            badge: '0 Port Public',
            human:
              'Les serveurs communiquent entre eux à travers un tunnel chiffré privé ultra-rapide directement intégré au cœur de Linux, sans jamais ouvrir de port vulnérable sur Internet.',
            geek:
              'Transport inter-nœuds (`10.10.10.210` <-> `10.10.10.211`) sur interface WireGuard noyau (`wg0`) ou LAN d’isolation, avec échange direct des blocs CAS 4 Mio immuables en HTTP/UDS sans surcharge TLS redondante.',
            agent:
              'INVARIANT [NET-06]: Zero unauthenticated public TCP ports (GEM-001). Peer replication and healing operate over authenticated WireGuard mesh.',
            cli: `# Configuration des pairs d'auto-guérison dans /etc/meshfs/s3.env ou meshfs.env
MESHFS_PEERS="http://10.10.10.211:9000,http://10.10.10.211:7443"`,
          },
          {
            code: 'F-07',
            title: 'Bail Atomique Single-Writer à Époque Monotone (Epoch Fencing)',
            badge: 'Anti Split-Brain',
            human:
              'Empêche deux serveurs d’écrire en même temps au même endroit par erreur, sans avoir besoin d’installer 5 serveurs d’arbitrage coûteux.',
            geek:
              'Chaque volume possède un bail `SingleWriterLease` (`holder_node_id`, `epoch` strictement croissant, `expires_at` TTL). Toute écriture présentant un `epoch` inférieur au bail actif est immédiatement rejetée (`Fenced`).',
            agent:
              'INVARIANT [LEASE-07]: Mutable volume mutations require active Single-Writer lease with monotonic epoch E_new > E_old.',
            cli: `# Acquisition et renouvellement de bail Single-Writer sur un volume
meshfs volume create prod-vm-disk --owner node-210`,
          },
          {
            code: 'F-08',
            title: 'Coupe-Circuit de Réparation Bornée (Règle 38 : k ≤ 2)',
            badge: 'Règle 38 Shaper OS',
            human:
              'Si une panne est impossible à réparer automatiquement (par exemple tous les câbles réseau sont coupés), le système s’arrête proprement après 2 essais au lieu de tourner en boucle jusqu’au crash.',
            geek:
              'Application stricte du théorème d’arrêt Shaper OS Règle 38 : maximum $k \\le 2$ tentatives de réconciliation avant déclenchement du coupe-circuit et émission de l’état terminal déterministe `REPAIR_EXHAUSTED`.',
            agent:
              'INVARIANT [R38-08]: Bounded self-repair retries k <= 2. Halt immediately on 2nd failure with explicit terminal state REPAIR_EXHAUSTED.',
            cli: `# Audit de l'état de santé et des invariants Règle 38
meshfs status`,
          },
        ],
      },
      {
        id: 'posix_fuse',
        code: 'DOMAINE III',
        title: 'Système de Fichiers POSIX, FUSE & Volumes Mutables',
        subtitle: 'Utilisez le stockage distribué comme un simple dossier local à 106 Mo/s.',
        features: [
          {
            code: 'F-09',
            title: 'Montage FUSE 3 en Espace Utilisateur',
            badge: '106 Mo/s Mesurés',
            human:
              'Votre stockage distribué apparaît comme un dossier ordinaire sur votre ordinateur ou serveur Linux, comme si vous aviez branché un disque dur externe.',
            geek:
              'Pont VFS via `fuse3` en espace utilisateur (`meshfs-p2p` / matérialisation locale) : aucun module noyau hors-arbre (`kmod`), zéro risque de Kernel Panic, débit mesuré à `106 Mo/s` avec `fdatasync`.',
            agent:
              'INVARIANT [FUSE-09]: Userspace VFS mount via mainline Linux FUSE 3. Zero custom kernel module compilation required.',
            cli: `# Montage et synchronisation d'un volume MeshFS
meshfs put --volume workstation-vol ./rapport.pdf /docs/rapport.pdf
meshfs get --volume workstation-vol /docs/rapport.pdf ./rapport-restored.pdf`,
          },
          {
            code: 'F-10',
            title: 'Fidélité Bit-à-Bit des Attributs POSIX',
            badge: 'Qualifié Lab 2',
            human:
              'Les droits d’accès, propriétaires, dates de modification et liens spéciaux de vos fichiers Linux sont conservés à l’identique au bit près.',
            geek:
              'Préservation stricte des modes POSIX (`0755`, `0640`, `0600`, `0444`), `UID`/`GID` numériques (`101000` rootless inclus), liens symboliques (`symlink`), liens durs (`hardlink`) et timestamps.',
            agent:
              'INVARIANT [POSIX-10]: Bit-exact preservation of mode, numeric uid/gid, symlinks, hardlinks, and SHA-256 payload hashes.',
            cli: `# Liste détaillée des fichiers et empreintes Merkle d'un volume
meshfs ls --volume workstation-vol`,
          },
          {
            code: 'F-11',
            title: 'Snapshots Copy-on-Write Instantanés O(1) & Rollback',
            badge: '< 1 ms',
            human:
              'Prenez une « photo » instantanée de votre volume avant une mise à jour risquée : cela prend moins d’un millième de seconde et 0 Mo d’espace supplémentaire.',
            geek:
              'Un snapshot fige simplement le dictionnaire `files -> Vec<ChunkHash>` et sa `merkle_root` dans les métadonnées du volume. Le rollback restaure l’état antérieur en $\\mathcal{O}(1)$ sans déplacer un seul chunk.',
            agent:
              'INVARIANT [SNAP-11]: O(1) metadata snapshot creation and rollback over immutable CAS chunks.',
            cli: `# Créer un snapshot instantané et revenir en arrière (rollback)
meshfs snapshot create --volume prod-vol --name avant-upgrade
meshfs snapshot list --volume prod-vol
meshfs snapshot rollback --volume prod-vol --name avant-upgrade`,
          },
          {
            code: 'F-12',
            title: 'Streaming Haut Débit à Mémoire Bornée (put_stream / get_stream)',
            badge: 'RAM < 15 Mo',
            human:
              'Vous pouvez envoyer ou télécharger des fichiers géants de 500 Go sur un petit serveur disposant de très peu de mémoire vive sans jamais le faire ralentir.',
            geek:
              'Lecture et écriture par flux continu (`put_stream` / `get_stream`) avec tampon glissant borné à `4 MiB`. La consommation RAM du démon Rust reste plate (`~12 Mo`) quelle que soit la taille du fichier.',
            agent:
              'INVARIANT [STREAM-12]: Constant O(1) memory allocation (bounded 4 MiB buffer) regardless of total object or volume size.',
            cli: `# Upload et download en streaming HTTP direct sans charger tout le fichier en RAM
curl -X PUT --data-binary @image-vm-100G.raw http://127.0.0.1:7443/api/v1/meshfs/stream/prod-vol/vm.raw`,
          },
        ],
      },
      {
        id: 'containers_pve',
        code: 'DOMAINE IV',
        title: 'Conteneurs Podman / Docker & Hyperviseur Proxmox VE',
        subtitle: 'Intégration native sans Kubernetes avec Podman, Docker et Proxmox VE 8/9.',
        features: [
          {
            code: 'F-13',
            title: 'Plugin de Volume Natif Podman / Docker (meshfs.sock)',
            badge: 'Qualifié Stage 14',
            human:
              'Vos conteneurs Podman et Docker peuvent utiliser directement des volumes MeshFS dédupliqués avec une simple option standard, sans avoir besoin d’installer Kubernetes.',
            geek:
              'Serveur HTTP-sur-UDS natif `/run/docker/plugins/meshfs.sock` + `/etc/docker/plugins/meshfs.spec` implémentant le protocole Docker/Podman **VolumeDriver v1.2** (`Activate`, `Capabilities`, `Create`, `Remove`, `Mount`, `Path`, `Unmount`, `Get`, `List`).',
            agent:
              'INVARIANT [DOCKER-PLUGIN-13]: Native VolumeDriver v1.2 on /run/docker/plugins/meshfs.sock with global scope and -o size quota support.',
            cli: `# Test direct du socket Podman/Docker VolumeDriver v1.2
curl -s --unix-socket /run/docker/plugins/meshfs.sock -X POST http://localhost/Plugin.Activate
curl -s --unix-socket /run/docker/plugins/meshfs.sock -X POST http://localhost/VolumeDriver.Create \\
  -d '{"Name":"mon-vol-podman","Opts":{"size":"20M"}}'`,
          },
          {
            code: 'F-14',
            title: 'Matérialisation & Rescellement CAS Automatique au Mount/Unmount',
            badge: 'Cycle Conteneur',
            human:
              'Quand un conteneur démarre, MeshFS prépare ses fichiers ; dès que le conteneur s’arrête, toutes ses modifications sont automatiquement découpées en blocs de 4 Mo et protégées.',
            geek:
              'Lors de `/VolumeDriver.Mount`, `materialize_volume_to_dir` reconstruit l’arborescence dans `/var/lib/meshfs/mounts/<vol>`. Au dernier `/VolumeDriver.Unmount` (`refcount == 0`), `sync_dir_to_volume` découpe les fichiers modifiés en chunks CAS 4 Mio et met à jour la `merkle_root`.',
            agent:
              'INVARIANT [MOUNT-SYNC-14]: Reference-counted Mount/Unmount lifecycle with automatic CAS materialization and Merkle resealing on final unmount.',
            cli: `# Montage, écriture et rescellement CAS automatique
curl -s --unix-socket /run/docker/plugins/meshfs.sock -X POST http://localhost/VolumeDriver.Mount -d '{"Name":"mon-vol-podman","ID":"c1"}'
curl -s --unix-socket /run/docker/plugins/meshfs.sock -X POST http://localhost/VolumeDriver.Unmount -d '{"Name":"mon-vol-podman","ID":"c1"}'`,
          },
          {
            code: 'F-15',
            title: 'Pilote de Stockage Proxmox VE 8 & 9 (podmesh-pve-plugin)',
            badge: 'Certifié PVE 9',
            human:
              'Ajoute MeshFS directement dans les menus de Proxmox VE pour héberger vos disques de machines virtuelles et conteneurs LXC sur un cluster dès 2 serveurs.',
            geek:
              'Module Perl officiel `PVE::Storage::Custom::MeshFSPlugin` (`/usr/share/perl5/PVE/Storage/Custom/MeshFSPlugin.pm`) supportant `alloc_image`, `free_image`, `volume_snapshot`, `volume_snapshot_rollback`, `list_images` et `status`.',
            agent:
              'INVARIANT [PVE-15]: Full Proxmox VE Storage Plugin API compliance (APIVER 10+) packaged in podmesh-pve-plugin_2.3.0_amd64.deb.',
            cli: `# Installation du plugin Proxmox VE depuis deb.xavdp.pro
apt-get install -y podmesh-meshfs podmesh-pve-plugin
pvesm status`,
          },
          {
            code: 'F-16',
            title: 'Sauvegarde Instantanée Zéro-Transfert avec PMBS',
            badge: '0 Octet Recopié',
            human:
              'Comme le serveur de sauvegarde PMBS utilise exactement les mêmes blocs de 4 Mo que MeshFS, sauvegarder une machine virtuelle ne prend quasiment aucun temps ni espace supplémentaire.',
            geek:
              'Partage direct du pool `/var/lib/meshfs/cas` entre `podmesh-meshfs`, `podmesh-meshfs-s3` et `podmesh-pmbs`. Les chunks déjà présents ne sont ni relus ni re-transférés lors d’un backup.',
            agent:
              'INVARIANT [ZERO-TRANSIT-16]: Unchanged 4 MiB SHA-256 chunks require 0 bytes of I/O transfer between MeshFS, MeshFS-S3, and PMBS.',
            cli: `# Vérification d'un chunk partagé entre un volume MeshFS et un bucket S3
meshfs-s3 status`,
          },
        ],
      },
      {
        id: 's3_satellite',
        code: 'DOMAINE V',
        title: 'Satellite S3 Souverain (podmesh-meshfs-s3)',
        subtitle: 'Une passerelle S3 ultra-rapide en Rust sur le port :9000 adossée au pool CAS 4 Mio.',
        features: [
          {
            code: 'F-17',
            title: 'API S3 Compatible (PUT, GET, HEAD, DELETE, ListObjectsV2)',
            badge: 'Qualifié Stages 2–5',
            human:
              'Toutes vos applications compatibles Amazon S3 (sauvegardes, vidéos, IA, Nextcloud) peuvent se brancher directement sur MeshFS.',
            geek:
              'Démon Rust `meshfs-s3` écoutant sur `:9000` et `/var/lib/meshfs/s3/s3.sock`. Supporte `ListBuckets`, `CreateBucket`, `DeleteBucket`, `ListObjectsV2` (avec `prefix` et `max-keys`), `PutObject`, `GetObject`, `HeadObject`, `DeleteObject`.',
            agent:
              'INVARIANT [S3-API-17]: S3 XML REST interface backed by JSON Merkle object manifests in /var/lib/meshfs/s3/buckets/<bucket>/objects/.',
            cli: `# Créer un bucket S3 et lister son contenu via CLI ou client S3
meshfs-s3 bucket create sovereign-vault
meshfs-s3 object list sovereign-vault`,
          },
          {
            code: 'F-18',
            title: 'Multipart Upload S3 en Temps Constant O(1)',
            badge: 'Zéro Recopie Disque',
            human:
              'Lorsqu’un gros fichier est envoyé en plusieurs morceaux en S3, les serveurs classiques doivent tout recoller à la fin (ce qui est lent). MeshFS assemble les morceaux instantanément sans rien recopier.',
            geek:
              'Contrairement à MinIO/Ceph qui réécrivent les octets lors du `CompleteMultipartUpload` ($\\mathcal{O}(N)$), `podmesh-meshfs-s3` concatène simplement les vecteurs de hashes SHA-256 des parties et calcule la `merkle_root` en `< 1 ms` ($\\mathcal{O}(1)$).',
            agent:
              'INVARIANT [MULTIPART-18]: CompleteMultipartUpload executes in O(1) disk I/O by sealing ordered part chunk-hash arrays.',
            cli: `# Initier, envoyer des parties et compléter un Multipart Upload S3 en O(1)
curl -X POST "http://127.0.0.1:9000/sovereign-vault/big.iso?uploads"`,
          },
          {
            code: 'F-19',
            title: 'Verrouillage Immuable WORM (S3 Object Lock Anti-Ransomware)',
            badge: 'Qualifié Stage 7',
            human:
              'Vous pouvez verrouiller un fichier jusqu’à une date choisie (par exemple 2030) : même un pirate ou un administrateur ne pourra ni l’effacer ni le modifier avant cette date.',
            geek:
              'Support des en-têtes `x-amz-object-lock-mode` (`COMPLIANCE` / `GOVERNANCE`) et `x-amz-object-lock-retain-until-date` (ainsi que `PUT ?retention`). Tout `DELETE` ou écrasement d’un objet sous rétention active renvoie **`HTTP 403 AccessDenied (ObjectLocked)`**.',
            agent:
              'INVARIANT [WORM-19]: Active Object Lock (retain_until > now) strictly blocks DELETE and overwrite mutations with HTTP 403 ObjectLocked.',
            cli: `# Verrouiller un objet S3 en mode WORM COMPLIANCE jusqu'en 2030
meshfs-s3 object put sovereign-vault contrat.pdf ./contrat.pdf --retain-until 2030-01-01T00:00:00Z`,
          },
          {
            code: 'F-20',
            title: 'Requêtes Partielles HTTP Range (206 Partial Content)',
            badge: 'Qualifié Stage 6',
            human:
              'Permet de lire uniquement quelques secondes au milieu d’une vidéo de 10 Go ou d’interroger une base de données sans télécharger tout le fichier.',
            geek:
              'Analyse de l’en-tête `Range: bytes=start-end` : `podmesh-meshfs-s3` calcule uniquement les chunks de 4 Mio couvrant la plage demandée (`chunk_idx = offset / 4 MiB`), lit la tranche exacte et répond en `HTTP 206 Partial Content` avec `Content-Range`.',
            agent:
              'INVARIANT [RANGE-20]: Byte-range requests read only the intersecting 4 MiB CAS chunks in O(range_len).',
            cli: `# Lire uniquement les octets 100 à 299 d'un objet S3
curl -H "Range: bytes=100-299" http://127.0.0.1:9000/sovereign-vault/big.iso`,
          },
          {
            code: 'F-21',
            title: 'Authentification HMAC-SHA256 & URLs Pré-signées',
            badge: 'Qualifié Stage 8',
            human:
              'Créez un lien de téléchargement temporaire sécurisé (valable par exemple 1 heure) pour partager un fichier sans donner vos mots de passe.',
            geek:
              'Validation cryptographique des requêtes par signature `HMAC-SHA256` (`X-Amz-Signature`, `X-Amz-Expires`), en-têtes AWS SigV4 `Authorization` ou clés API, plus générateur CLI `meshfs-s3 presign`.',
            agent:
              'INVARIANT [PRESIGN-21]: Constant-time HMAC-SHA256 signature verification for presigned URLs with strict expiration enforcement.',
            cli: `# Générer une URL pré-signée valable 3600 secondes
meshfs-s3 presign sovereign-vault contrat.pdf --method GET --expires 3600`,
          },
        ],
      },
      {
        id: 'governance_gc',
        code: 'DOMAINE VI',
        title: 'Gouvernance de l’Espace : Garbage Collector, Quotas & Télémétrie',
        subtitle: 'Maîtrise totale de l’espace disque, purge sûre des blocs orphelins et observabilité Prometheus.',
        features: [
          {
            code: 'F-22',
            title: 'Garbage Collector CAS Universel (meshfs gc / meshfs-s3 gc)',
            badge: 'Qualifié Stage 12',
            human:
              'Lorsque vous supprimez de vieux fichiers, le nettoyeur intelligent vérifie qu’aucune VM, aucun bucket S3 ni aucune sauvegarde n’a encore besoin de ces blocs avant de libérer l’espace disque.',
            geek:
              'Algorithme *Mark-and-Sweep* multi-protocoles qui extrait récursivement toutes les références `sha256` dans `/var/lib/meshfs/meta`, `/var/lib/meshfs/s3/buckets`, `/var/lib/meshfs/s3/multipart` et `/var/lib/pmbs`, puis supprime uniquement les chunks non référencés plus anciens que `--grace-seconds` (supporte `--dry-run`).',
            agent:
              'INVARIANT [GC-22]: Zero false-positive chunk deletion across POSIX, S3, Multipart, and PMBS metadata trees.',
            cli: `# Simulation (--dry-run) puis exécution réelle du Garbage Collector CAS universel
meshfs gc --dry-run
meshfs-s3 gc --grace-seconds 3600`,
          },
          {
            code: 'F-23',
            title: 'Quotas Stricts par Volume et par Bucket (HTTP 507 QuotaExceeded)',
            badge: 'Qualifié Stage 12',
            human:
              'Fixez une limite de taille maximale par dossier ou par bucket S3 : aucun utilisateur ni conteneur ne pourra remplir votre disque dur par accident.',
            geek:
              'Contrôle pré-commit dans `ensure_volume_quota` et `ensure_bucket_quota` (sur `PutObject` et `CompleteMultipartUpload`). Si `used_bytes + new_bytes > max_bytes`, l’opération est rejetée avec **`HTTP 507 Insufficient Storage` (`QuotaExceeded`)**.',
            agent:
              'INVARIANT [QUOTA-23]: Hard quota enforcement per volume and per S3 bucket returning HTTP 507 QuotaExceeded before manifest commit.',
            cli: `# Définir un quota strict de 10 Go sur un volume ou un bucket S3
meshfs quota set prod-vol --max-bytes 10737418240
meshfs-s3 quota set sovereign-vault --max-bytes 10737418240`,
          },
          {
            code: 'F-24',
            title: 'Télémétrie Prometheus Native (/metrics) & Ratio de Déduplication',
            badge: 'Grafana Ready',
            human:
              'Visualisez en temps réel combien de gigaoctets la déduplication vous fait économiser et combien de pannes disque ont été réparées automatiquement.',
            geek:
              'Endpoints `GET /metrics` sur `:7443` et `:9000` au format texte Prometheus exposant `logical_bytes`, `physical_cas_bytes`, `dedup_saved_bytes`, `dedup_ratio`, `worm_locked_objects` et `self_healed_chunks_total`.',
            agent:
              'INVARIANT [METRICS-24]: Real-time Prometheus exposition on :7443/metrics and :9000/metrics for autonomous observability.',
            cli: `# Consulter les métriques Prometheus en direct
curl -s http://127.0.0.1:9000/metrics
curl -s http://127.0.0.1:7443/metrics`,
          },
        ],
      },
      {
        id: 'ai_packaging',
        code: 'DOMAINE VII',
        title: 'Exploitation « AI-First », Sockets Unix & Packaging Debian 13',
        subtitle: 'Conçu dès le premier jour pour être installé en 3 secondes et piloté par des humains ou des agents IA.',
        features: [
          {
            code: 'F-25',
            title: 'Plan de Contrôle par Socket Unix Local (meshfs.sock & s3.sock)',
            badge: 'Zéro Latence TCP',
            human:
              'Sur le serveur lui-même, les commandes d’administration passent par un canal interne ultra-sécurisé protégé par les droits Linux, sans passer par le réseau.',
            geek:
              'Sockets Unix `/var/lib/meshfs/meshfs.sock` et `/var/lib/meshfs/s3/s3.sock` créés en mode `0600` (répertoire parent `0700`) permettant une administration locale sans jeton exposé sur le réseau.',
            agent:
              'INVARIANT [UDS-25]: Local control plane over 0600 Unix Domain Sockets (/var/lib/meshfs/meshfs.sock, /var/lib/meshfs/s3/s3.sock).',
            cli: `# Interroger le démon directement via son socket Unix local
curl -s --unix-socket /var/lib/meshfs/s3/s3.sock http://localhost/status | jq .`,
          },
          {
            code: 'F-26',
            title: 'Packaging Debian 13 (Trixie) « Zero-Touch » & Dépôt APT Signé',
            badge: 'deb.xavdp.pro',
            human:
              'Un simple `apt install` suffit : le paquet crée tout seul ses clés de sécurité, configure le système et démarre le service en moins de 2 secondes.',
            geek:
              'Paquets `podmesh-meshfs_2.3.0_amd64.deb` et `podmesh-meshfs-s3_2.3.0_amd64.deb` signés GPG sur `https://deb.xavdp.pro` (`trixie-stable`). Le `postinst` génère les clés CSPRNG 256 bits dans `/etc/meshfs/*.env` (`0600`) et active les unités systemd durcies (`ProtectSystem=strict`, `NoNewPrivileges=true`).',
            agent:
              'INVARIANT [DEB-26]: Idempotent Zero-Touch Debian 13 installation with automatic 256-bit CSPRNG secret provisioning in postinst.',
            cli: `# Installation officielle en 1 commande sur Debian 13 (Trixie)
apt-get update && apt-get install -y podmesh-meshfs podmesh-meshfs-s3 podmesh-pve-plugin`,
          },
          {
            code: 'F-27',
            title: 'Sorties JSON Déterministes pour Agents IA Autonomes',
            badge: 'AI-First',
            human:
              'Toutes les commandes de MeshFS parlent un langage structuré parfait pour que votre assistant IA puisse vérifier, réparer ou gérer votre stockage sans jamais se tromper.',
            geek:
              'Toutes les commandes CLI (`status`, `verify`, `gc`, `quota`, `presign`) produisent des structures JSON strictes avec codes de retour POSIX normalisés (`0` nominal, `!= 0` fail-closed).',
            agent:
              'INVARIANT [AI-JSON-27]: All CLI and UDS endpoints emit machine-verifiable JSON schemas for zero-hallucination AI orchestration.',
            cli: `# Audit JSON complet exploitable par un agent IA en 15 ms
meshfs status | jq '{volumes, chunks, dedupRatio, selfHealedChunks}'`,
          },
          {
            code: 'F-28',
            title: 'Fondation Btrfs Copy-on-Write & Installateur Bare-Metal',
            badge: 'podmesh-installer',
            human:
              'L’installateur officiel prépare vos disques NVMe avec le système Btrfs pour combiner la protection locale du matériel avec la réplication réseau de MeshFS.',
            geek:
              'Partitionnement automatisé par `podmesh-installer` avec sous-volumes Btrfs dédiés `@meshfs_cas` et `@pmbs_backups`, compression `zstd` optionnelle et vérification CRC32c/SHA-256 matérielle.',
            agent:
              'INVARIANT [BTRFS-28]: Dedicated @meshfs_cas Btrfs subvolume layout providing local CoW atomicity underneath distributed CAS chunks.',
            cli: `# Vérifier l'état du pool CAS sur le système de fichiers local
df -Th /var/lib/meshfs/cas`,
          },
        ],
      },
    ],
  },

  en: {
    nav: {
      home: 'MeshFS Home',
      features: '28 Features',
      compare: 'Comparison (12 vs MeshFS)',
      pmbs: 'PMBS Backup',
    },
    hero: {
      kicker: 'Exhaustive Capability Catalog · MeshFS v2.3.0',
      title: 'All 28 Features of the MeshFS Ecosystem.',
      subtitle:
        'From 4 MiB BLAKE3 CAS chunking to the WORM S3 satellite, native Podman/Docker volume plugin, Proxmox VE storage driver, inline P2P bit-rot self-healing, and universal Garbage Collector: every capability is iron-proven on Debian 13.',
      badge: '28 Qualified Features · 7 Functional Domains · 14/14 Lab Stages PASS',
      searchPlaceholder: 'Search any feature (e.g. S3, WORM, Podman, FUSE, bit-rot, quota, GC, Proxmox)...',
      expandSpecLabel: 'CLI Command, REST API & Lab Proof',
      copyBtn: 'Copy',
      copiedBtn: 'Copied!',
    },
    stats: [
      { value: '28', label: 'Native Features' },
      { value: '4 MiB', label: 'BLAKE3 CAS Granularity' },
      { value: '< 15 MB', label: 'Rust RAM Footprint' },
      { value: '6-in-1', label: 'Unified Protocols' },
    ],
    domainFilters: {
      all: 'All (28)',
      cas_core: '1. CAS Core & Integrity (4)',
      p2p_heal: '2. P2P & Self-Healing (4)',
      posix_fuse: '3. POSIX, FUSE & Volumes (4)',
      containers_pve: '4. Podman, Docker & Proxmox (4)',
      s3_satellite: '5. S3 Satellite & WORM (5)',
      governance_gc: '6. Quotas, GC & Metrics (3)',
      ai_packaging: '7. AI-First, Socket & Debian 13 (4)',
    },
    domains: [
      {
        id: 'cas_core',
        code: 'DOMAIN I',
        title: 'CAS Engine & Cryptographic Integrity',
        subtitle: 'The immutable 4 MiB SHA-256 foundation that makes silent data corruption mathematically impossible.',
        features: [
          {
            code: 'F-01',
            title: '4 MiB CAS Chunking & Strict SHA-256 Addressing',
            badge: 'Core Math',
            human:
              'Every file is sliced into 4 MB blocks. Each block is named after its exact cryptographic fingerprint (SHA-256), making silent tampering impossible.',
            geek:
              'Deterministic slicing at `4,194,304` bytes (`CHUNK_SIZE = 4 MiB`). Stored in a 2-level fanout `/var/lib/meshfs/cas/<h[0..2]>/<h[2..4]>/<sha256>.chunk` for O(1) directory lookups.',
            agent:
              'INVARIANT [CAS-01]: Address(Chunk) === SHA256(Payload). Max chunk size = 4,194,304 bytes.',
            cli: `ls -lh /var/lib/meshfs/cas/*/*/*.chunk | head -n 5`,
          },
          {
            code: 'F-02',
            title: 'Global Cross-Protocol Deduplication (Zero-Copy)',
            badge: '50% to 90% Saved',
            human:
              'Identical data across 10 Proxmox VMs, 5 Podman containers, and an S3 bucket is stored physically only once on disk.',
            geek:
              'Single `/var/lib/meshfs/cas` pool shared by `podmesh-meshfs`, `podmesh-meshfs-s3`, and `podmesh-pmbs`. Writes short-circuit immediately if the chunk already exists.',
            agent:
              'INVARIANT [DEDUP-02]: Cross-protocol deduplication across Volumes, S3 Buckets, and PMBS Snapshots.',
            cli: `meshfs status && meshfs-s3 status`,
          },
          {
            code: 'F-03',
            title: 'Merkle Tree Cryptographic Sealing (merkle_root)',
            badge: 'O(1) Audit',
            human:
              'Every file and volume has a master cryptographic seal summarizing all its blocks, allowing instant integrity verification.',
            geek:
              'Hierarchical `merkle_root = sha256(h_1 : h_2 : ... : h_n)` stored in every volume and S3 object manifest, also serving as the S3 `ETag`.',
            agent:
              'INVARIANT [MERKLE-03]: Volume and S3 manifests seal ordered chunk hashes into an O(1) verifiable Merkle root.',
            cli: `meshfs verify`,
          },
          {
            code: 'F-04',
            title: 'Atomic POSIX Temp-to-Final Writes',
            badge: 'Fail-Closed',
            human:
              'Even if power is yanked mid-write, existing files and metadata are never corrupted or half-written.',
            geek:
              'Staging write with `O_NOFOLLOW`, `0600`/`0700` modes, hardware `sync_all()`, atomic POSIX `rename()`, and parent directory `fsync()`.',
            agent:
              'INVARIANT [ATOMIC-04]: temp-write -> fsync(fd) -> atomic rename -> fsync(parent_dir).',
            cli: `curl -s --unix-socket /var/lib/meshfs/meshfs.sock http://localhost/status | jq .`,
          },
        ],
      },
      {
        id: 'p2p_heal',
        code: 'DOMAIN II',
        title: 'P2P Mesh, Self-Healing & Lightweight Consensus',
        subtitle: 'Zero Single Point of Failure (0 SPOF) and automatic inline repair of corrupted disk sectors.',
        features: [
          {
            code: 'F-05',
            title: 'Transparent P2P Self-Healing on Bit-Rot',
            badge: 'Qualified Stage 13',
            human:
              'If a local disk sector silently corrupts ("bit-rot"), MeshFS detects the mismatch on read, fetches the healthy block from a peer, and repairs your disk on the fly.',
            geek:
              'Inside `ChunkStore::read_chunk`, if a local chunk is missing or fails SHA-256 verification, the node queries `MESHFS_PEERS` (`GET /cas/chunk/:hash`), verifies the peer payload SHA-256, atomically repairs the local file, and increments `self_healed_chunks`.',
            agent:
              'INVARIANT [HEAL-05]: Inline peer fetch, SHA-256 verification, and atomic local disk repair on bit-rot detection.',
            cli: `curl -s http://127.0.0.1:9000/metrics | grep self_healed_chunks_total`,
          },
          {
            code: 'F-06',
            title: 'In-Kernel WireGuard P2P Mesh (GEM-001)',
            badge: '0 Public Ports',
            human:
              'Nodes communicate over an encrypted kernel-level WireGuard mesh without exposing vulnerable public ports.',
            geek:
              'Peer-to-peer chunk and manifest replication over WireGuard (`10.10.10.210` <-> `10.10.10.211`) with zero central coordinator.',
            agent:
              'INVARIANT [NET-06]: Zero unauthenticated public TCP ports (GEM-001).',
            cli: `MESHFS_PEERS="http://10.10.10.211:9000,http://10.10.10.211:7443"`,
          },
          {
            code: 'F-07',
            title: 'Monotonic Epoch Single-Writer Leases (Epoch Fencing)',
            badge: 'Split-Brain Proof',
            human:
              'Prevents two servers from conflicting on the same mutable volume without needing a 5-node Raft cluster.',
            geek:
              'Each volume enforces a `SingleWriterLease` with strictly increasing `epoch` and TTL expiration, fencing stale writers immediately.',
            agent:
              'INVARIANT [LEASE-07]: Mutable volume writes require active lease with monotonic epoch E_new > E_old.',
            cli: `meshfs volume create prod-vm-disk --owner node-210`,
          },
          {
            code: 'F-08',
            title: 'Bounded Self-Repair Circuit Breaker (Rule 38: k ≤ 2)',
            badge: 'Shaper OS Rule 38',
            human:
              'If an unrecoverable hardware fault occurs, the system halts cleanly after 2 attempts instead of spinning in infinite retry loops.',
            geek:
              'Enforces Shaper OS Rule 38: at most $k \\le 2$ repair attempts before tripping the circuit breaker and raising `REPAIR_EXHAUSTED`.',
            agent:
              'INVARIANT [R38-08]: Bounded self-repair retries k <= 2 -> terminal state REPAIR_EXHAUSTED.',
            cli: `meshfs status`,
          },
        ],
      },
      {
        id: 'posix_fuse',
        code: 'DOMAIN III',
        title: 'POSIX Filesystem, FUSE & Mutable Volumes',
        subtitle: 'Mount distributed storage as a standard local directory at 106 MB/s.',
        features: [
          {
            code: 'F-09',
            title: 'Userspace FUSE 3 Mount',
            badge: '106 MB/s Measured',
            human:
              'Mount your distributed storage like a regular folder on your Linux workstation or server without risky kernel modules.',
            geek:
              'Userspace FUSE 3 VFS integration delivering `106 MB/s` synchronous write throughput with zero out-of-tree `kmod`.',
            agent:
              'INVARIANT [FUSE-09]: Mainline Linux FUSE 3 userspace mount.',
            cli: `meshfs put --volume workstation-vol ./report.pdf /docs/report.pdf`,
          },
          {
            code: 'F-10',
            title: 'Bit-Exact POSIX Attribute Fidelity',
            badge: 'Qualified Lab 2',
            human:
              'File permissions, owners, symlinks, and timestamps are preserved bit-for-bit.',
            geek:
              'Preserves exact POSIX modes (`0755`, `0640`, `0600`), numeric `UID`/`GID` (including rootless `101000`), symlinks, hardlinks, and timestamps.',
            agent:
              'INVARIANT [POSIX-10]: Bit-exact preservation of POSIX metadata and payload hashes.',
            cli: `meshfs ls --volume workstation-vol`,
          },
          {
            code: 'F-11',
            title: 'Instant O(1) Copy-on-Write Snapshots & Rollback',
            badge: '< 1 ms',
            human:
              'Take an instant snapshot before a risky upgrade in under a millisecond with zero extra disk space.',
            geek:
              'Clones the volume’s Merkle file map in $\\mathcal{O}(1)$ without duplicating any 4 MiB CAS chunks.',
            agent:
              'INVARIANT [SNAP-11]: O(1) metadata snapshot creation and rollback.',
            cli: `meshfs snapshot create --volume prod-vol --name pre-upgrade`,
          },
          {
            code: 'F-12',
            title: 'Bounded-Memory High-Throughput Streaming',
            badge: 'RAM < 15 MB',
            human:
              'Stream 500 GB VM images on tiny servers without ever running out of RAM.',
            geek:
              '`put_stream` and `get_stream` process data in a sliding `4 MiB` buffer, keeping daemon RSS flat at `~12 MB`.',
            agent:
              'INVARIANT [STREAM-12]: Constant O(1) memory allocation regardless of file size.',
            cli: `curl -X PUT --data-binary @vm-100G.raw http://127.0.0.1:7443/api/v1/meshfs/stream/prod-vol/vm.raw`,
          },
        ],
      },
      {
        id: 'containers_pve',
        code: 'DOMAIN IV',
        title: 'Podman / Docker Containers & Proxmox VE Hypervisor',
        subtitle: 'Native container and VM integration without Kubernetes bloat.',
        features: [
          {
            code: 'F-13',
            title: 'Native Podman / Docker Volume Plugin (meshfs.sock)',
            badge: 'Qualified Stage 14',
            human:
              'Attach deduplicated MeshFS volumes directly to Podman or Docker containers without needing Kubernetes.',
            geek:
              'Implements Docker/Podman **VolumeDriver v1.2** over `/run/docker/plugins/meshfs.sock` + `/etc/docker/plugins/meshfs.spec`.',
            agent:
              'INVARIANT [DOCKER-PLUGIN-13]: Native VolumeDriver v1.2 on /run/docker/plugins/meshfs.sock.',
            cli: `curl -s --unix-socket /run/docker/plugins/meshfs.sock -X POST http://localhost/Plugin.Activate`,
          },
          {
            code: 'F-14',
            title: 'Automatic CAS Materialization & Merkle Resealing on Mount/Unmount',
            badge: 'Container Lifecycle',
            human:
              'Files are materialized when a container starts and automatically re-chunked and sealed into CAS when it stops.',
            geek:
              '`Mount` materializes chunks into `/var/lib/meshfs/mounts/<vol>`; final `Unmount` runs `sync_dir_to_volume` and seals the new `merkle_root`.',
            agent:
              'INVARIANT [MOUNT-SYNC-14]: Automatic CAS materialization on Mount and Merkle sealing on Unmount.',
            cli: `curl -s --unix-socket /run/docker/plugins/meshfs.sock -X POST http://localhost/VolumeDriver.Mount -d '{"Name":"vol1","ID":"c1"}'`,
          },
          {
            code: 'F-15',
            title: 'Proxmox VE 8 & 9 Storage Driver (podmesh-pve-plugin)',
            badge: 'PVE 9 Certified',
            human:
              'Adds MeshFS directly into the Proxmox VE interface for VM disks, snapshots, and fast migration.',
            geek:
              'Official `PVE::Storage::Custom::MeshFSPlugin` Perl driver packaged in `podmesh-pve-plugin_2.3.0_amd64.deb`.',
            agent:
              'INVARIANT [PVE-15]: Full Proxmox VE Storage Plugin API compliance.',
            cli: `apt-get install -y podmesh-meshfs podmesh-pve-plugin && pvesm status`,
          },
          {
            code: 'F-16',
            title: 'Zero-Transit Backup Coupling with PMBS',
            badge: '0 Bytes Re-Copied',
            human:
              'Because PMBS shares the exact same 4 MiB CAS chunks, backing up a MeshFS volume requires zero data re-transfer.',
            geek:
              'Shared `/var/lib/meshfs/cas` pool across MeshFS, MeshFS-S3, and PMBS enables instantaneous $\\mathcal{O}(1)$ backups.',
            agent:
              'INVARIANT [ZERO-TRANSIT-16]: Zero byte transfer for unchanged chunks during PMBS backup.',
            cli: `meshfs-s3 status`,
          },
        ],
      },
      {
        id: 's3_satellite',
        code: 'DOMAIN V',
        title: 'Sovereign S3 Satellite (podmesh-meshfs-s3)',
        subtitle: 'A high-speed Rust S3 gateway on port :9000 backed directly by the 4 MiB CAS pool.',
        features: [
          {
            code: 'F-17',
            title: 'S3 Compatible API (PUT, GET, HEAD, DELETE, ListObjectsV2)',
            badge: 'Qualified Stages 2–5',
            human:
              'Connect any S3-compatible app, backup tool, or AI pipeline directly to MeshFS.',
            geek:
              '`meshfs-s3` daemon on `:9000` supporting bucket/object CRUD, prefix filtering, and Merkle `ETag` headers.',
            agent:
              'INVARIANT [S3-API-17]: S3 REST interface backed by JSON Merkle manifests.',
            cli: `meshfs-s3 bucket create sovereign-vault && meshfs-s3 object list sovereign-vault`,
          },
          {
            code: 'F-18',
            title: 'O(1) Constant-Time S3 Multipart Upload',
            badge: 'Zero Disk Copy',
            human:
              'Completing a multi-gigabyte S3 multipart upload takes less than a millisecond because MeshFS never re-copies the parts on disk.',
            geek:
              '`CompleteMultipartUpload` simply concatenates the ordered SHA-256 chunk lists of each uploaded part in $\\mathcal{O}(1)$.',
            agent:
              'INVARIANT [MULTIPART-18]: O(1) manifest seal on CompleteMultipartUpload.',
            cli: `curl -X POST "http://127.0.0.1:9000/sovereign-vault/big.iso?uploads"`,
          },
          {
            code: 'F-19',
            title: 'Immutable WORM S3 Object Lock (Anti-Ransomware)',
            badge: 'Qualified Stage 7',
            human:
              'Lock critical files until a future date so neither ransomware nor admins can delete or alter them.',
            geek:
              'Enforces `COMPLIANCE` and `GOVERNANCE` retention dates, rejecting any `DELETE` or overwrite with **`HTTP 403 AccessDenied (ObjectLocked)`**.',
            agent:
              'INVARIANT [WORM-19]: Active Object Lock rejects deletion/overwrite with HTTP 403.',
            cli: `meshfs-s3 object put sovereign-vault contract.pdf ./contract.pdf --retain-until 2030-01-01T00:00:00Z`,
          },
          {
            code: 'F-20',
            title: 'Surgical HTTP Byte-Range Reads (206 Partial Content)',
            badge: 'Qualified Stage 6',
            human:
              'Seek into the middle of a huge video or dataset instantly by reading only the exact 4 MB block needed.',
            geek:
              'Computes `chunk_idx = offset / 4 MiB` and streams only the intersecting slice with `HTTP 206 Partial Content`.',
            agent:
              'INVARIANT [RANGE-20]: O(range_len) surgical chunk slicing on HTTP Range requests.',
            cli: `curl -H "Range: bytes=100-299" http://127.0.0.1:9000/sovereign-vault/big.iso`,
          },
          {
            code: 'F-21',
            title: 'HMAC-SHA256 Authentication & Presigned URLs',
            badge: 'Qualified Stage 8',
            human:
              'Generate temporary self-expiring download or upload links without sharing your credentials.',
            geek:
              'Supports AWS SigV4 headers, Bearer keys, and `X-Amz-Signature` presigned URLs via `meshfs-s3 presign`.',
            agent:
              'INVARIANT [PRESIGN-21]: Constant-time HMAC-SHA256 presigned URL validation.',
            cli: `meshfs-s3 presign sovereign-vault contract.pdf --method GET --expires 3600`,
          },
        ],
      },
      {
        id: 'governance_gc',
        code: 'DOMAIN VI',
        title: 'Storage Governance: Universal GC, Quotas & Telemetry',
        subtitle: 'Full disk space control, safe orphan chunk reclamation, and Prometheus observability.',
        features: [
          {
            code: 'F-22',
            title: 'Universal Multi-Protocol CAS Garbage Collector (meshfs gc)',
            badge: 'Qualified Stage 12',
            human:
              'Safely reclaims disk space from deleted files only after verifying no VM, S3 bucket, or backup still references those blocks.',
            geek:
              'Mark-and-Sweep scanner traversing `/var/lib/meshfs/meta`, `/var/lib/meshfs/s3`, and `/var/lib/pmbs` with `--grace-seconds` and `--dry-run`.',
            agent:
              'INVARIANT [GC-22]: Zero false-positive chunk deletion across all 3 storage consumers.',
            cli: `meshfs gc --dry-run && meshfs-s3 gc --grace-seconds 3600`,
          },
          {
            code: 'F-23',
            title: 'Strict Volume & Bucket Quotas (HTTP 507 QuotaExceeded)',
            badge: 'Qualified Stage 12',
            human:
              'Set hard capacity limits per volume or S3 bucket so no container or user can fill up your disks.',
            geek:
              'Pre-commit quota checks rejecting any write exceeding `max_bytes` with **`HTTP 507 Insufficient Storage` (`QuotaExceeded`)**.',
            agent:
              'INVARIANT [QUOTA-23]: Pre-commit quota check returning HTTP 507 QuotaExceeded.',
            cli: `meshfs-s3 quota set sovereign-vault --max-bytes 10737418240`,
          },
          {
            code: 'F-24',
            title: 'Native Prometheus Telemetry (/metrics) & Dedup Ratio',
            badge: 'Grafana Ready',
            human:
              'Track your exact deduplication savings and self-healed chunks in real time.',
            geek:
              '`GET /metrics` on `:7443` and `:9000` exposing `logical_bytes`, `physical_cas_bytes`, `dedup_ratio`, `worm_locked_objects`, and `self_healed_chunks_total`.',
            agent:
              'INVARIANT [METRICS-24]: Prometheus text exposition on :7443/metrics and :9000/metrics.',
            cli: `curl -s http://127.0.0.1:9000/metrics`,
          },
        ],
      },
      {
        id: 'ai_packaging',
        code: 'DOMAIN VII',
        title: 'AI-First Operations, Unix Sockets & Debian 13 Packaging',
        subtitle: 'Built for 2-second installation and deterministic orchestration by humans or AI agents.',
        features: [
          {
            code: 'F-25',
            title: 'Local Unix Domain Socket Control Plane (meshfs.sock & s3.sock)',
            badge: 'Zero TCP Overhead',
            human:
              'Local administration runs over a private kernel socket protected by Linux file permissions.',
            geek:
              '`0600` Unix sockets `/var/lib/meshfs/meshfs.sock` and `/var/lib/meshfs/s3/s3.sock` for zero-latency local IPC.',
            agent:
              'INVARIANT [UDS-25]: Local control plane over 0600 Unix Domain Sockets.',
            cli: `curl -s --unix-socket /var/lib/meshfs/s3/s3.sock http://localhost/status | jq .`,
          },
          {
            code: 'F-26',
            title: 'Zero-Touch Debian 13 (Trixie) Packaging & Signed APT Repo',
            badge: 'deb.xavdp.pro',
            human:
              'A single `apt install` generates cryptographic keys, configures systemd, and starts the service automatically.',
            geek:
              'GPG-signed `.deb` packages on `https://deb.xavdp.pro` (`trixie-stable`) with automatic 256-bit CSPRNG secret generation in `postinst`.',
            agent:
              'INVARIANT [DEB-26]: Idempotent Zero-Touch Debian 13 package installation.',
            cli: `apt-get update && apt-get install -y podmesh-meshfs podmesh-meshfs-s3`,
          },
          {
            code: 'F-27',
            title: 'Deterministic JSON Contracts for Autonomous AI Agents',
            badge: 'AI-First',
            human:
              'Every CLI command outputs clean structured JSON so AI assistants can audit and manage storage reliably.',
            geek:
              'Strict JSON outputs across all CLI subcommands (`status`, `verify`, `gc`, `quota`, `presign`).',
            agent:
              'INVARIANT [AI-JSON-27]: Machine-verifiable JSON output across all CLI commands.',
            cli: `meshfs status | jq .`,
          },
          {
            code: 'F-28',
            title: 'Native Btrfs Copy-on-Write Foundation (podmesh-installer)',
            badge: 'Bare-Metal Ready',
            human:
              'Pairs local Btrfs NVMe integrity with MeshFS’s distributed P2P CAS mesh.',
            geek:
              'Dedicated `@meshfs_cas` and `@pmbs_backups` Btrfs subvolumes provisioned by `podmesh-installer`.',
            agent:
              'INVARIANT [BTRFS-28]: Local Btrfs CoW subvolumes underneath distributed CAS chunks.',
            cli: `df -Th /var/lib/meshfs/cas`,
          },
        ],
      },
    ],
  },

  es: {
    nav: {
      home: 'Inicio MeshFS',
      features: '28 Funcionalidades',
      compare: 'Comparativa (12 vs MeshFS)',
      pmbs: 'PMBS Backup',
    },
    hero: {
      kicker: 'Catálogo Exhaustivo de Capacidades · MeshFS v2.3.0',
      title: 'Las 28 Funcionalidades del Ecosistema MeshFS.',
      subtitle:
        'Desde la fragmentación CAS de 4 MiB SHA-256 hasta el satélite S3 WORM, el plugin nativo de volúmenes Podman/Docker, el controlador Proxmox VE, la auto-curación P2P contra bit-rot y el Garbage Collector universal: cada capacidad está probada en Debian 13.',
      badge: '28 Funcionalidades Calificadas · 7 Dominios · 14/14 Etapas de Laboratorio PASS',
      searchPlaceholder: 'Buscar una funcionalidad (ej: S3, WORM, Podman, FUSE, bit-rot, cuota, GC, Proxmox)...',
      expandSpecLabel: 'Comando CLI, API REST y Prueba de Laboratorio',
      copyBtn: 'Copiar',
      copiedBtn: '¡Copiado!',
    },
    stats: [
      { value: '28', label: 'Funcionalidades Nativas' },
      { value: '4 MiB', label: 'Granularidad CAS SHA-256' },
      { value: '< 15 MB', label: 'Huella RAM en Rust' },
      { value: '6-en-1', label: 'Protocolos Unificados' },
    ],
    domainFilters: {
      all: 'Todas (28)',
      cas_core: '1. Núcleo CAS e Integridad (4)',
      p2p_heal: '2. P2P y Auto-Curación (4)',
      posix_fuse: '3. POSIX, FUSE y Volúmenes (4)',
      containers_pve: '4. Podman, Docker y Proxmox (4)',
      s3_satellite: '5. Satélite S3 y WORM (5)',
      governance_gc: '6. Cuotas, GC y Métricas (3)',
      ai_packaging: '7. AI-First, Socket y Debian 13 (4)',
    },
    domains: [
      {
        id: 'cas_core',
        code: 'DOMINIO I',
        title: 'Motor CAS e Integridad Criptográfica',
        subtitle: 'La base inmutable de 4 MiB SHA-256 que hace imposible la corrupción silenciosa.',
        features: [
          {
            code: 'F-01',
            title: 'Fragmentación CAS de 4 MiB y Direccionamiento SHA-256',
            badge: 'Base Matemática',
            human:
              'Cada archivo se divide en bloques de 4 MB cuyo nombre es su huella digital SHA-256 única.',
            geek:
              'Fragmentación determinista a `4.194.304` bytes en `/var/lib/meshfs/cas/<h[0..2]>/<h[2..4]>/<sha256>.chunk`.',
            agent:
              'INVARIANT [CAS-01]: Address(Chunk) === SHA256(Payload). Max chunk size = 4,194,304 bytes.',
            cli: `ls -lh /var/lib/meshfs/cas/*/*/*.chunk | head -n 5`,
          },
          {
            code: 'F-02',
            title: 'Deduplicación Global Multi-Protocolo (Cero-Copia)',
            badge: 'Ahorro 50% a 90%',
            human:
              'Los bloques idénticos entre VMs Proxmox, contenedores Podman, buckets S3 y backups PMBS se guardan una sola vez.',
            geek:
              'Pool único `/var/lib/meshfs/cas` compartido entre `podmesh-meshfs`, `podmesh-meshfs-s3` y `podmesh-pmbs`.',
            agent:
              'INVARIANT [DEDUP-02]: Cross-protocol deduplication across Volumes, S3, and PMBS.',
            cli: `meshfs status && meshfs-s3 status`,
          },
          {
            code: 'F-03',
            title: 'Sellado Criptográfico por Árbol de Merkle (merkle_root)',
            badge: 'Auditoría O(1)',
            human:
              'Cada volumen y objeto tiene un sello criptográfico maestro que certifica la integridad en un milisegundo.',
            geek:
              '`merkle_root = sha256(h_1 : h_2 : ... : h_n)` en cada manifiesto de volumen y objeto S3 (`ETag`).',
            agent:
              'INVARIANT [MERKLE-03]: O(1) verifiable SHA-256 Merkle root per volume and S3 object.',
            cli: `meshfs verify`,
          },
          {
            code: 'F-04',
            title: 'Escritura Atómica POSIX Anti-Corrupción (Temp-to-Final)',
            badge: 'Fail-Closed',
            human:
              'Incluso ante un corte eléctrico, tus archivos nunca quedan corruptos ni a medio escribir.',
            geek:
              'Escritura temporal con `O_NOFOLLOW`, `0600`, `sync_all()`, `rename()` atómico y `fsync()` del directorio padre.',
            agent:
              'INVARIANT [ATOMIC-04]: temp-write -> fsync(fd) -> atomic rename -> fsync(parent_dir).',
            cli: `curl -s --unix-socket /var/lib/meshfs/meshfs.sock http://localhost/status | jq .`,
          },
        ],
      },
      {
        id: 'p2p_heal',
        code: 'DOMINIO II',
        title: 'Red P2P, Auto-Curación y Consenso Ligero',
        subtitle: 'Cero punto único de fallo (0 SPOF) y reparación automática de sectores dañados.',
        features: [
          {
            code: 'F-05',
            title: 'Auto-Curación P2P Transparente ante Bit-Rot',
            badge: 'Calificado Stage 13',
            human:
              'Si un bloque del disco se daña silenciosamente, MeshFS descarga la copia sana de un nodo vecino y repara tu disco al instante.',
            geek:
              'En `ChunkStore::read_chunk`, si falla el SHA-256 local, descarga el bloque desde `MESHFS_PEERS` (`GET /cas/chunk/:hash`), verifica su SHA-256, repara el disco atómicamente e incrementa `self_healed_chunks`.',
            agent:
              'INVARIANT [HEAL-05]: Automatic peer fetch, SHA-256 check, and atomic disk repair on bit-rot.',
            cli: `curl -s http://127.0.0.1:9000/metrics | grep self_healed_chunks_total`,
          },
          {
            code: 'F-06',
            title: 'Malla P2P sobre WireGuard en Kernel (GEM-001)',
            badge: '0 Puertos Públicos',
            human:
              'Los servidores se comunican por un túnel cifrado WireGuard sin abrir puertos públicos en Internet.',
            geek:
              'Replicación P2P entre nodos (`10.10.10.210` <-> `10.10.10.211`) sobre WireGuard sin servidor maestro.',
            agent:
              'INVARIANT [NET-06]: Zero unauthenticated public TCP ports (GEM-001).',
            cli: `MESHFS_PEERS="http://10.10.10.211:9000,http://10.10.10.211:7443"`,
          },
          {
            code: 'F-07',
            title: 'Arrendamiento Single-Writer con Época Monótona',
            badge: 'Anti Split-Brain',
            human:
              'Evita conflictos de escritura simultánea sin necesitar 5 servidores de arbitraje.',
            geek:
              '`SingleWriterLease` con contador `epoch` estrictamente creciente y expiración TTL.',
            agent:
              'INVARIANT [LEASE-07]: Monotonic epoch Single-Writer lease fencing.',
            cli: `meshfs volume create prod-vm-disk --owner node-210`,
          },
          {
            code: 'F-08',
            title: 'Disyuntor de Reparación Acotada (Regla 38: k ≤ 2)',
            badge: 'Regla 38 Shaper OS',
            human:
              'Ante un fallo físico irreparable, se detiene limpiamente tras 2 intentos sin caer en bucles infinitos.',
            geek:
              'Máximo $k \\le 2$ intentos de auto-reparación antes de emitir `REPAIR_EXHAUSTED`.',
            agent:
              'INVARIANT [R38-08]: Bounded retries k <= 2 -> terminal state REPAIR_EXHAUSTED.',
            cli: `meshfs status`,
          },
        ],
      },
      {
        id: 'posix_fuse',
        code: 'DOMINIO III',
        title: 'Sistema de Archivos POSIX, FUSE y Volúmenes Mutables',
        subtitle: 'Monta el almacenamiento distribuido como una carpeta local a 106 MB/s.',
        features: [
          {
            code: 'F-09',
            title: 'Montaje FUSE 3 en Espacio de Usuario',
            badge: '106 MB/s Medidos',
            human:
              'Tu almacenamiento distribuido aparece como una carpeta normal en Linux sin tocar el kernel.',
            geek:
              'Montaje VFS vía `fuse3` a `106 MB/s` sin módulos de kernel externos (`kmod`).',
            agent:
              'INVARIANT [FUSE-09]: Mainline Linux FUSE 3 userspace mount.',
            cli: `meshfs put --volume workstation-vol ./informe.pdf /docs/informe.pdf`,
          },
          {
            code: 'F-10',
            title: 'Fidelidad Bit a Bit de Atributos POSIX',
            badge: 'Calificado Lab 2',
            human:
              'Conserva permisos, propietarios, enlaces simbólicos y fechas exactamente igual.',
            geek:
              'Preservación exacta de modos (`0755`, `0600`), `UID`/`GID` numéricos, symlinks y hardlinks.',
            agent:
              'INVARIANT [POSIX-10]: Bit-exact POSIX metadata preservation.',
            cli: `meshfs ls --volume workstation-vol`,
          },
          {
            code: 'F-11',
            title: 'Snapshots Copy-on-Write Instantáneos O(1) y Rollback',
            badge: '< 1 ms',
            human:
              'Crea instantáneas antes de un cambio crítico en menos de un milisegundo y sin gastar espacio.',
            geek:
              'Clona el manifiesto Merkle en $\\mathcal{O}(1)$ sin duplicar bloques de 4 MiB.',
            agent:
              'INVARIANT [SNAP-11]: O(1) metadata snapshot creation and rollback.',
            cli: `meshfs snapshot create --volume prod-vol --name pre-upgrade`,
          },
          {
            code: 'F-12',
            title: 'Streaming de Alto Rendimiento con Memoria Acotada',
            badge: 'RAM < 15 MB',
            human:
              'Transfiere archivos de 500 GB manteniendo el consumo de RAM por debajo de 15 MB.',
            geek:
              '`put_stream` y `get_stream` con buffer deslizante de `4 MiB`.',
            agent:
              'INVARIANT [STREAM-12]: Constant O(1) RAM footprint regardless of payload size.',
            cli: `curl -X PUT --data-binary @vm-100G.raw http://127.0.0.1:7443/api/v1/meshfs/stream/prod-vol/vm.raw`,
          },
        ],
      },
      {
        id: 'containers_pve',
        code: 'DOMINIO IV',
        title: 'Contenedores Podman / Docker e Hipervisor Proxmox VE',
        subtitle: 'Integración nativa sin Kubernetes con Podman, Docker y Proxmox VE 8/9.',
        features: [
          {
            code: 'F-13',
            title: 'Plugin de Volumen Nativo Podman / Docker (meshfs.sock)',
            badge: 'Calificado Stage 14',
            human:
              'Conecta volúmenes deduplicados MeshFS directamente a tus contenedores Podman o Docker sin Kubernetes.',
            geek:
              'Implementa **VolumeDriver v1.2** en `/run/docker/plugins/meshfs.sock` + `/etc/docker/plugins/meshfs.spec`.',
            agent:
              'INVARIANT [DOCKER-PLUGIN-13]: Native VolumeDriver v1.2 over /run/docker/plugins/meshfs.sock.',
            cli: `curl -s --unix-socket /run/docker/plugins/meshfs.sock -X POST http://localhost/Plugin.Activate`,
          },
          {
            code: 'F-14',
            title: 'Materialización y Resellado CAS Automático en Mount/Unmount',
            badge: 'Ciclo Contenedor',
            human:
              'Prepara los archivos al arrancar el contenedor y los vuelve a sellar en bloques de 4 MB al detenerlo.',
            geek:
              '`Mount` materializa en `/var/lib/meshfs/mounts/<vol>`; `Unmount` ejecuta `sync_dir_to_volume` y sella el `merkle_root`.',
            agent:
              'INVARIANT [MOUNT-SYNC-14]: Automatic CAS materialization and Merkle resealing.',
            cli: `curl -s --unix-socket /run/docker/plugins/meshfs.sock -X POST http://localhost/VolumeDriver.Mount -d '{"Name":"vol1","ID":"c1"}'`,
          },
          {
            code: 'F-15',
            title: 'Controlador de Almacenamiento Proxmox VE 8 y 9 (podmesh-pve-plugin)',
            badge: 'Certificado PVE 9',
            human:
              'Integra MeshFS directamente en Proxmox VE para discos de VMs, snapshots y migración.',
            geek:
              '`PVE::Storage::Custom::MeshFSPlugin` empaquetado en `podmesh-pve-plugin_2.3.0_amd64.deb`.',
            agent:
              'INVARIANT [PVE-15]: Proxmox VE Storage Plugin API compliance.',
            cli: `apt-get install -y podmesh-meshfs podmesh-pve-plugin && pvesm status`,
          },
          {
            code: 'F-16',
            title: 'Copia de Seguridad Cero-Tránsito con PMBS',
            badge: '0 Bytes Recopiados',
            human:
              'Al compartir el mismo pool CAS de 4 MB, respaldar un volumen en PMBS es instantáneo.',
            geek:
              'Pool `/var/lib/meshfs/cas` compartido entre MeshFS, MeshFS-S3 y PMBS.',
            agent:
              'INVARIANT [ZERO-TRANSIT-16]: Zero byte transfer for unchanged chunks during PMBS backup.',
            cli: `meshfs-s3 status`,
          },
        ],
      },
      {
        id: 's3_satellite',
        code: 'DOMINIO V',
        title: 'Satélite S3 Soberano (podmesh-meshfs-s3)',
        subtitle: 'Pasarela S3 ultrarrápida en Rust en el puerto :9000 sobre el pool CAS de 4 MiB.',
        features: [
          {
            code: 'F-17',
            title: 'API S3 Compatible (PUT, GET, HEAD, DELETE, ListObjectsV2)',
            badge: 'Calificado Stages 2–5',
            human:
              'Conecta cualquier aplicación compatible con Amazon S3 directamente a MeshFS.',
            geek:
              'Demonio `meshfs-s3` en `:9000` con soporte CRUD de buckets/objetos y `ETag` Merkle.',
            agent:
              'INVARIANT [S3-API-17]: S3 XML REST interface backed by JSON Merkle manifests.',
            cli: `meshfs-s3 bucket create sovereign-vault && meshfs-s3 object list sovereign-vault`,
          },
          {
            code: 'F-18',
            title: 'Multipart Upload S3 en Tiempo Constante O(1)',
            badge: 'Cero Recopia en Disco',
            human:
              'Ensambla subidas S3 multiparte en menos de un milisegundo sin volver a copiar los datos en disco.',
            geek:
              '`CompleteMultipartUpload` sella la lista ordenada de hashes SHA-256 en $\\mathcal{O}(1)$.',
            agent:
              'INVARIANT [MULTIPART-18]: O(1) manifest seal on CompleteMultipartUpload.',
            cli: `curl -X POST "http://127.0.0.1:9000/sovereign-vault/big.iso?uploads"`,
          },
          {
            code: 'F-19',
            title: 'Bloqueo Inmutable WORM (S3 Object Lock Anti-Ransomware)',
            badge: 'Calificado Stage 7',
            human:
              'Protege archivos hasta una fecha futura impidiendo su borrado incluso por un administrador o ransomware.',
            geek:
              'Modos `COMPLIANCE` y `GOVERNANCE` rechazando `DELETE` o sobrescritura con **`HTTP 403 AccessDenied (ObjectLocked)`**.',
            agent:
              'INVARIANT [WORM-19]: Active Object Lock rejects deletion with HTTP 403.',
            cli: `meshfs-s3 object put sovereign-vault contrato.pdf ./contrato.pdf --retain-until 2030-01-01T00:00:00Z`,
          },
          {
            code: 'F-20',
            title: 'Lecturas Parciales HTTP Range (206 Partial Content)',
            badge: 'Calificado Stage 6',
            human:
              'Lee solo la parte exacta de un vídeo o archivo gigante sin descargarlo entero.',
            geek:
              'Calcula `chunk_idx = offset / 4 MiB` y devuelve `HTTP 206 Partial Content`.',
            agent:
              'INVARIANT [RANGE-20]: O(range_len) surgical chunk slicing.',
            cli: `curl -H "Range: bytes=100-299" http://127.0.0.1:9000/sovereign-vault/big.iso`,
          },
          {
            code: 'F-21',
            title: 'Autenticación HMAC-SHA256 y URLs Prefirmadas',
            badge: 'Calificado Stage 8',
            human:
              'Genera enlaces temporales seguros para compartir archivos sin exponer tus claves.',
            geek:
              'Validación `HMAC-SHA256` (`X-Amz-Signature`) y generador CLI `meshfs-s3 presign`.',
            agent:
              'INVARIANT [PRESIGN-21]: Constant-time HMAC-SHA256 presigned URL validation.',
            cli: `meshfs-s3 presign sovereign-vault contrato.pdf --method GET --expires 3600`,
          },
        ],
      },
      {
        id: 'governance_gc',
        code: 'DOMINIO VI',
        title: 'Gobernanza del Espacio: Garbage Collector, Cuotas y Telemetría',
        subtitle: 'Control total del espacio en disco, purga segura de bloques huérfanos y métricas Prometheus.',
        features: [
          {
            code: 'F-22',
            title: 'Garbage Collector CAS Universal (meshfs gc / meshfs-s3 gc)',
            badge: 'Calificado Stage 12',
            human:
              'Libera el espacio de archivos borrados verificando antes que ninguna VM, bucket S3 ni backup use esos bloques.',
            geek:
              'Escaneo *Mark-and-Sweep* sobre `/var/lib/meshfs/meta`, `/var/lib/meshfs/s3` y `/var/lib/pmbs` con `--grace-seconds` y `--dry-run`.',
            agent:
              'INVARIANT [GC-22]: Zero false-positive chunk deletion across all 3 consumers.',
            cli: `meshfs gc --dry-run && meshfs-s3 gc --grace-seconds 3600`,
          },
          {
            code: 'F-23',
            title: 'Cuotas Estrictas por Volumen y Bucket (HTTP 507 QuotaExceeded)',
            badge: 'Calificado Stage 12',
            human:
              'Define límites máximos por volumen o bucket S3 para evitar que se llene el disco.',
            geek:
              'Rechaza cualquier exceso de `max_bytes` con **`HTTP 507 Insufficient Storage` (`QuotaExceeded`)**.',
            agent:
              'INVARIANT [QUOTA-23]: Hard quota enforcement returning HTTP 507 QuotaExceeded.',
            cli: `meshfs-s3 quota set sovereign-vault --max-bytes 10737418240`,
          },
          {
            code: 'F-24',
            title: 'Telemetría Prometheus Nativa (/metrics) y Ratio de Deduplicación',
            badge: 'Grafana Ready',
            human:
              'Mide en tiempo real el espacio ahorrado por deduplicación y los bloques reparados automáticamente.',
            geek:
              '`GET /metrics` en `:7443` y `:9000` exponiendo `dedup_ratio`, `worm_locked_objects` y `self_healed_chunks_total`.',
            agent:
              'INVARIANT [METRICS-24]: Prometheus exposition on :7443/metrics and :9000/metrics.',
            cli: `curl -s http://127.0.0.1:9000/metrics`,
          },
        ],
      },
      {
        id: 'ai_packaging',
        code: 'DOMINIO VII',
        title: 'Operación «AI-First», Sockets Unix y Paquetes Debian 13',
        subtitle: 'Diseñado para instalarse en 2 segundos y ser operado por humanos o agentes IA.',
        features: [
          {
            code: 'F-25',
            title: 'Plano de Control por Socket Unix Local (meshfs.sock y s3.sock)',
            badge: 'Cero Latencia TCP',
            human:
              'La administración local viaja por un canal interno de Linux protegido por permisos `0600`.',
            geek:
              'Sockets Unix `/var/lib/meshfs/meshfs.sock` y `/var/lib/meshfs/s3/s3.sock` en modo `0600`.',
            agent:
              'INVARIANT [UDS-25]: Local control plane over 0600 Unix Domain Sockets.',
            cli: `curl -s --unix-socket /var/lib/meshfs/s3/s3.sock http://localhost/status | jq .`,
          },
          {
            code: 'F-26',
            title: 'Paquetes Debian 13 (Trixie) «Zero-Touch» y Repositorio APT Firmado',
            badge: 'deb.xavdp.pro',
            human:
              'Un simple `apt install` genera las claves de seguridad y arranca el servicio automáticamente.',
            geek:
              'Paquetes `.deb` firmados con GPG en `https://deb.xavdp.pro` (`trixie-stable`) con generación CSPRNG de 256 bits en `postinst`.',
            agent:
              'INVARIANT [DEB-26]: Idempotent Zero-Touch Debian 13 package installation.',
            cli: `apt-get update && apt-get install -y podmesh-meshfs podmesh-meshfs-s3`,
          },
          {
            code: 'F-27',
            title: 'Salidas JSON Deterministas para Agentes IA Autónomos',
            badge: 'AI-First',
            human:
              'Todos los comandos responden en formato JSON limpio para que los agentes IA operen sin errores.',
            geek:
              'Esquemas JSON estrictos en todos los subcomandos CLI (`status`, `verify`, `gc`, `quota`, `presign`).',
            agent:
              'INVARIANT [AI-JSON-27]: Machine-verifiable JSON output across all CLI commands.',
            cli: `meshfs status | jq .`,
          },
          {
            code: 'F-28',
            title: 'Base Btrfs Copy-on-Write e Instalador Bare-Metal',
            badge: 'podmesh-installer',
            human:
              'Combina la protección local de Btrfs en discos NVMe con la replicación P2P de MeshFS.',
            geek:
              'Subvolúmenes Btrfs dedicados `@meshfs_cas` y `@pmbs_backups` aprovisionados por `podmesh-installer`.',
            agent:
              'INVARIANT [BTRFS-28]: Local Btrfs CoW subvolumes underneath distributed CAS chunks.',
            cli: `df -Th /var/lib/meshfs/cas`,
          },
        ],
      },
    ],
  },
}
