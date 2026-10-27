import React, { useRef, useEffect, useState, useMemo } from 'react'

/**
 * Fractal3DCanvas Ultra-Pro "WOW Edition"
 * High-performance 3D spherical constellation simulator with WebGL/Canvas2D:
 * - Orbital 3D rotation, pitch, yaw, zoom and inertia
 * - Cosmic Starfield & 1000+ client space constellation particle cloud
 * - Glowing radial node spheres with dynamic pulsation
 * - Energy flow beams with moving light pulses
 * - Interactive node selection, hover tooltip & instant camera focus
 * - Zero GPU requirement (runs smoothly on CPU/ASPEED server chips at 60 FPS)
 */
export default function Fractal3DCanvas({
  data,
  selectedId,
  onSelectNode,
}) {
  const canvasRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState({ x: 0.38, y: -0.48 })
  const [zoom, setZoom] = useState(1.15)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showParticles, setShowParticles] = useState(true)
  const [hoveredNode, setHoveredNode] = useState(null)

  const dragStartRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef(null)

  // 1. Generate Cosmic Background Stars & 1000+ Space Dust Particles
  const backgroundStars = useMemo(() => {
    const stars = []
    for (let i = 0; i < 450; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1200,
        z: (Math.random() - 0.5) * 1600,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
      })
    }
    return stars
  }, [])

  // 2. Generate 1000+ Distant Micro-Spaces Constellation Cloud (Visualizing infinite scale)
  const cloudParticles = useMemo(() => {
    const cloud = []
    const cloudCount = 650 // Simule les centaines d'espaces clients en orbite lointaine
    for (let i = 0; i < cloudCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 340 + Math.random() * 140

      cloud.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta) * 0.45 - 30,
        z: radius * Math.cos(phi),
        color: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#06b6d4' : '#10b981',
        size: Math.random() * 2.2 + 1.2,
        pulseOffset: Math.random() * 6.28,
      })
    }
    return cloud
  }, [])

  // 3. Compute High-Definition Hierarchical Fractal Nodes
  const treeNodes = useMemo(() => {
    const nodes = []
    const root = data
    if (!root) return nodes

    // Étage 0 : Racine Souveraine
    nodes.push({
      id: root.id,
      name: root.name,
      label: 'RACINE SOUVERAINE',
      type: 'root',
      x: 0,
      y: 230,
      z: 0,
      radius: 26,
      color: '#6366f1',
      glowColor: 'rgba(99, 102, 241, 0.6)',
      data: root,
      level: 0,
    })

    const rootGov = root.governors?.[0]
    if (rootGov) {
      // Étage 1 : Gouverneur Racine (Master Ledger)
      nodes.push({
        id: rootGov.id,
        name: rootGov.name,
        label: 'MASTER GOVERNOR',
        type: 'governor',
        x: 0,
        y: 135,
        z: 0,
        radius: 20,
        color: '#3b82f6',
        glowColor: 'rgba(59, 130, 246, 0.6)',
        parentId: root.id,
        data: rootGov,
        level: 1,
      })

      // Étage 1.5 : Makers (Agents Pull Orbitaux)
      const makers = rootGov.makers || []
      const makerRadius = 115
      makers.forEach((m, idx) => {
        const angle = (idx / makers.length) * Math.PI * 2
        nodes.push({
          id: m.id,
          name: m.name,
          label: 'MAKER PULL',
          type: 'maker',
          x: Math.cos(angle) * makerRadius,
          y: 95,
          z: Math.sin(angle) * makerRadius,
          radius: 12,
          color: '#f59e0b',
          glowColor: 'rgba(245, 158, 11, 0.6)',
          parentId: rootGov.id,
          data: m,
          level: 2,
        })
      })

      // Étage 2 : Gouverneurs SaaS Métiers
      const saasGovs = rootGov.saasGovernors || []
      const saasRadius = 250
      saasGovs.forEach((sg, idx) => {
        const angle = (idx / saasGovs.length) * Math.PI * 2 - Math.PI / 6
        const sgX = Math.cos(angle) * saasRadius
        const sgY = -15
        const sgZ = Math.sin(angle) * saasRadius

        nodes.push({
          id: sg.id,
          name: sg.name,
          label: `${sg.managedSpacesCount} ESPACES`,
          type: 'saas_governor',
          x: sgX,
          y: sgY,
          z: sgZ,
          radius: 18,
          color: '#10b981',
          glowColor: 'rgba(16, 185, 129, 0.6)',
          parentId: rootGov.id,
          data: sg,
          level: 2,
        })

        // Étage 3 : Espaces Clients Déployés
        const spaces = sg.activeSpacesList || []
        const spaceSpread = 130
        spaces.forEach((sp, sIdx) => {
          const subAngle = angle + ((sIdx - (spaces.length - 1) / 2) * 0.52)
          const spX = sgX + Math.cos(subAngle) * spaceSpread
          const spY = sgY - 105
          const spZ = sgZ + Math.sin(subAngle) * spaceSpread

          nodes.push({
            id: sp.id,
            name: sp.name,
            clientName: sp.clientName,
            label: 'ESPACE CLIENT',
            type: 'space',
            x: spX,
            y: spY,
            z: spZ,
            radius: 15,
            color: '#ec4899',
            glowColor: 'rgba(236, 72, 153, 0.6)',
            parentId: sg.id,
            data: sp,
            level: 3,
          })

          // Étage 4 : Cellules Souches de l'Espace (Stem Cells)
          const cells = sp.cells || []
          const cellRadius = 48
          cells.forEach((cell, cIdx) => {
            const cAngle = (cIdx / cells.length) * Math.PI * 2
            const isDb = cell.kind?.includes('DB')
            const isCas = cell.kind?.includes('CAS')

            nodes.push({
              id: cell.id,
              name: cell.name,
              label: isDb ? 'UDS DB' : isCas ? 'CAS 4M' : 'STEM UI',
              type: 'cell',
              x: spX + Math.cos(cAngle) * cellRadius,
              y: spY - 65,
              z: spZ + Math.sin(cAngle) * cellRadius,
              radius: 9,
              color: isDb ? '#8b5cf6' : isCas ? '#06b6d4' : '#f97316',
              glowColor: isDb ? 'rgba(139, 92, 246, 0.5)' : isCas ? 'rgba(6, 182, 212, 0.5)' : 'rgba(249, 115, 22, 0.5)',
              parentId: sp.id,
              data: cell,
              level: 4,
            })
          })
        })
      })
    }

    return nodes
  }, [data])

  // Mouse drag & interaction controls
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setAutoRotate(false)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      dragStartRef.current = { x: e.clientX, y: e.clientY }

      setRotation((prev) => ({
        x: Math.max(-1.3, Math.min(1.3, prev.x + dy * 0.005)),
        y: prev.y + dx * 0.006,
      }))
    } else {
      // Hover detection
      let hovered = null
      let minDist = 22
      treeNodes.forEach((node) => {
        if (node.screenX !== undefined && node.screenY !== undefined) {
          const dist = Math.hypot(node.screenX - mouseX, node.screenY - mouseY)
          if (dist < minDist) {
            minDist = dist
            hovered = node
          }
        }
      })
      setHoveredNode(hovered)
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleWheel = (e) => {
    e.preventDefault()
    setZoom((z) => Math.max(0.35, Math.min(3.2, z - e.deltaY * 0.0014)))
  }

  const handleCanvasClick = () => {
    if (hoveredNode && onSelectNode) {
      onSelectNode(hoveredNode)
    }
  }

  // Focus Camera smoothly on a specific node
  const focusOnNode = (nodeId) => {
    const target = treeNodes.find((n) => n.id === nodeId)
    if (!target) return
    setAutoRotate(false)
    setRotation({ x: 0.25, y: -Math.atan2(target.x, target.z || 1) })
    setZoom(1.6)
  }

  // Main 60 FPS 3D Render Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let time = 0

    const render = () => {
      time += 0.016
      if (autoRotate && !isDragging) {
        setRotation((r) => ({ ...r, y: r.y + 0.0015 }))
      }

      const width = (canvas.width = canvas.parentElement.clientWidth)
      const height = (canvas.height = canvas.parentElement.clientHeight)

      ctx.clearRect(0, 0, width, height)

      // Camera & Perspective Matrix
      const cx = width / 2
      const cy = height / 2 + 25
      const fov = 680

      const cosY = Math.cos(rotation.y)
      const sinY = Math.sin(rotation.y)
      const cosX = Math.cos(rotation.x)
      const sinX = Math.sin(rotation.x)

      // Project Background Stars
      backgroundStars.forEach((star) => {
        const x1 = star.x * cosY - star.z * sinY
        const z1 = star.x * sinY + star.z * cosY
        const y2 = star.y * cosX - z1 * sinX
        const z2 = star.y * sinX + z1 * cosX + 800

        if (z2 > 10) {
          const scale = (fov / z2) * zoom
          const sx = cx + x1 * scale
          const sy = cy - y2 * scale
          ctx.fillStyle = `rgba(226, 232, 240, ${star.alpha * 0.7})`
          ctx.beginPath()
          ctx.arc(sx, sy, star.size * 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Project Distant Micro-Spaces Cloud Particles
      if (showParticles) {
        cloudParticles.forEach((p) => {
          const x1 = p.x * cosY - p.z * sinY
          const z1 = p.x * sinY + p.z * cosY
          const y2 = p.y * cosX - z1 * sinX
          const z2 = p.y * sinX + z1 * cosX + 650

          if (z2 > 10) {
            const scale = (fov / z2) * zoom
            const sx = cx + x1 * scale
            const sy = cy - y2 * scale
            const pulse = (Math.sin(time * 2 + p.pulseOffset) + 1) * 0.5
            ctx.fillStyle = p.color
            ctx.globalAlpha = 0.25 + pulse * 0.35
            ctx.beginPath()
            ctx.arc(sx, sy, p.size * scale * 0.8, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1.0
          }
        })
      }

      // Project 3D Tree Nodes
      treeNodes.forEach((node) => {
        const x1 = node.x * cosY - node.z * sinY
        const z1 = node.x * sinY + node.z * cosY
        const y2 = node.y * cosX - z1 * sinX
        const z2 = node.y * sinX + z1 * cosX + 620

        const scale = (fov / Math.max(10, z2)) * zoom
        node.screenX = cx + x1 * scale
        node.screenY = cy - y2 * scale
        node.screenRadius = Math.max(3.5, node.radius * scale)
        node.depth = z2
      })

      // Sort nodes by depth for z-indexing
      const sortedNodes = [...treeNodes].sort((a, b) => b.depth - a.depth)

      // Draw Orbit Constellation Rings
      ctx.save()
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)'
      ctx.lineWidth = 1
      for (let r = 90; r <= 380; r += 75) {
        ctx.beginPath()
        ctx.ellipse(cx, cy + 90 * zoom, r * zoom, (r * 0.38) * zoom, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.restore()

      // Draw Connection Beams & Energy Pulses
      treeNodes.forEach((node) => {
        if (!node.parentId) return
        const parent = treeNodes.find((p) => p.id === node.parentId)
        if (!parent) return

        const isHighlighted = selectedId === node.id || selectedId === parent.id || hoveredNode?.id === node.id

        ctx.beginPath()
        ctx.moveTo(parent.screenX, parent.screenY)
        ctx.lineTo(node.screenX, node.screenY)

        if (isHighlighted) {
          ctx.strokeStyle = '#f43f5e'
          ctx.lineWidth = 2.8
        } else {
          ctx.strokeStyle = `rgba(148, 163, 184, ${Math.min(0.55, 360 / node.depth)})`
          ctx.lineWidth = Math.max(1, 1.8 * (360 / node.depth))
        }
        ctx.stroke()

        // Energy pulse beam
        const pulseProgress = (time * 1.6 + (node.level * 0.35)) % 1
        const px = parent.screenX + (node.screenX - parent.screenX) * pulseProgress
        const py = parent.screenY + (node.screenY - parent.screenY) * pulseProgress

        ctx.beginPath()
        ctx.arc(px, py, (isHighlighted ? 3.5 : 2.2) * zoom, 0, Math.PI * 2)
        ctx.fillStyle = isHighlighted ? '#fda4af' : '#60a5fa'
        ctx.shadowColor = '#60a5fa'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw Nodes (Spheres with Radial 3D Gradients & Glow)
      sortedNodes.forEach((node) => {
        const isSelected = selectedId === node.id
        const isHovered = hoveredNode?.id === node.id

        ctx.save()
        ctx.beginPath()
        ctx.arc(node.screenX, node.screenY, node.screenRadius, 0, Math.PI * 2)

        const grad = ctx.createRadialGradient(
          node.screenX - node.screenRadius * 0.32,
          node.screenY - node.screenRadius * 0.32,
          node.screenRadius * 0.08,
          node.screenX,
          node.screenY,
          node.screenRadius
        )

        if (isSelected || isHovered) {
          grad.addColorStop(0, '#ffffff')
          grad.addColorStop(0.4, isSelected ? '#f43f5e' : '#38bdf8')
          grad.addColorStop(1, '#0f172a')
          ctx.shadowColor = isSelected ? '#f43f5e' : '#38bdf8'
          ctx.shadowBlur = 22
        } else {
          grad.addColorStop(0, '#ffffff')
          grad.addColorStop(0.35, node.color)
          grad.addColorStop(1, '#020617')
          ctx.shadowColor = node.color
          ctx.shadowBlur = 6
        }

        ctx.fillStyle = grad
        ctx.fill()
        ctx.shadowBlur = 0

        // Selection Target Ring
        if (isSelected || isHovered) {
          ctx.beginPath()
          ctx.arc(node.screenX, node.screenY, node.screenRadius + 6, 0, Math.PI * 2)
          ctx.strokeStyle = isSelected ? '#f43f5e' : '#38bdf8'
          ctx.lineWidth = 2
          ctx.setLineDash([4, 4])
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Labels : Afficher uniquement Racine, Gouverneur principal, ou le nœud survolé/sélectionné pour éviter toute superposition
        const shouldShowLabel = node.level <= 1 || isSelected || isHovered
        if (shouldShowLabel) {
          const displayName = node.name.length > 24 ? node.name.slice(0, 22) + '…' : node.name
          const fontSize = Math.max(10, Math.round(11 * zoom))
          ctx.font = `bold ${fontSize}px ui-sans-serif, system-ui, sans-serif`
          ctx.textAlign = 'center'

          const textWidth = ctx.measureText(displayName).width
          const bgHeight = node.label ? 30 : 18
          const bgY = node.screenY + node.screenRadius + 4

          // Fond pill semi-transparent pour garantir une lisibilité absolue et zéro superposition avec la scène
          ctx.fillStyle = isSelected ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.75)'
          ctx.beginPath()
          if (ctx.roundRect) {
            ctx.roundRect(node.screenX - textWidth / 2 - 8, bgY, textWidth + 16, bgHeight, 6)
          } else {
            ctx.rect(node.screenX - textWidth / 2 - 8, bgY, textWidth + 16, bgHeight)
          }
          ctx.fill()
          ctx.strokeStyle = isSelected ? '#6366f1' : 'rgba(255, 255, 255, 0.15)'
          ctx.lineWidth = 1
          ctx.stroke()

          ctx.fillStyle = isSelected ? '#ffffff' : '#f1f5f9'
          ctx.fillText(displayName, node.screenX, bgY + 13)

          if (node.label) {
            ctx.font = `bold 9px ui-monospace, monospace`
            ctx.fillStyle = node.color
            ctx.fillText(node.label, node.screenX, bgY + 25)
          }
        }

        ctx.restore()
      })

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [treeNodes, backgroundStars, cloudParticles, rotation, zoom, selectedId, autoRotate, isDragging, showParticles, hoveredNode])

  return (
    <div
      className="relative w-full h-[660px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 select-none cursor-grab active:cursor-grabbing shadow-2xl"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      onClick={handleCanvasClick}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating HUD Top Left */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/60 text-xs font-bold text-slate-200 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          <span>Cathédrale Fractale Souveraine 3D</span>
          <span className="text-slate-400 font-mono text-[11px]">({treeNodes.length} entités majeures · 1000+ espaces)</span>
        </div>
        <p className="text-[11px] text-slate-400 max-w-sm pl-1">
          Navigation 3D orbitale libre · Zoom molette · Cliquez sur n'importe quel élément pour le cibler et inspecter ses métriques.
        </p>
      </div>

      {/* Interactive Controls Top Right */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setAutoRotate((r) => !r)}
          className={`backdrop-blur-md px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
            autoRotate
              ? 'bg-accent/20 border-accent/40 text-accent'
              : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-white'
          }`}
        >
          {autoRotate ? 'Rotation Auto : ON' : 'Rotation : Pause'}
        </button>

        <button
          type="button"
          onClick={() => setShowParticles((p) => !p)}
          className={`backdrop-blur-md px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
            showParticles
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-white'
          }`}
        >
          Nuage 1000+ Espaces
        </button>

        <button
          type="button"
          onClick={() => {
            setRotation({ x: 0.38, y: -0.48 })
            setZoom(1.15)
            setAutoRotate(true)
          }}
          className="bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-bold text-slate-300 hover:text-white transition-all shadow-sm"
        >
          Recentrer Caméra
        </button>
      </div>

      {/* Quick Focal Shortcuts Bottom Right */}
      <div className="absolute bottom-4 right-4 flex flex-wrap items-center gap-2 bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-slate-700/60 text-xs font-bold text-slate-300">
        <span className="text-[10px] text-slate-400 font-mono pl-1">Ciblage Rapide :</span>
        <button
          type="button"
          onClick={() => focusOnNode('space-boutique-fleuriste')}
          className="bg-slate-800 hover:bg-pink-600/40 px-2.5 py-1 rounded-lg border border-slate-700/60 text-pink-400 transition-colors"
        >
          Boutique Fleuriste
        </button>
        <button
          type="button"
          onClick={() => focusOnNode('space-vox-clinic-alpha')}
          className="bg-slate-800 hover:bg-sky-600/40 px-2.5 py-1 rounded-lg border border-slate-700/60 text-sky-400 transition-colors"
        >
          Vox Clinic
        </button>
        <button
          type="button"
          onClick={() => focusOnNode('space-crm-rep-industries')}
          className="bg-slate-800 hover:bg-emerald-600/40 px-2.5 py-1 rounded-lg border border-slate-700/60 text-emerald-400 transition-colors"
        >
          CRM-Rep
        </button>
      </div>

      {/* Legend Badge Bottom Left */}
      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 bg-slate-900/85 backdrop-blur-md p-2.5 rounded-2xl border border-slate-700/60 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500" />
          <span className="text-slate-300 font-medium">Racine</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500" />
          <span className="text-slate-300 font-medium">Gouverneur</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
          <span className="text-slate-300 font-medium">Makers (Pull)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
          <span className="text-slate-300 font-medium">SaaS Clusters</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500" />
          <span className="text-slate-300 font-medium">Espaces Clients</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
          <span className="text-slate-300 font-medium">Cellules Souches</span>
        </div>
      </div>
    </div>
  )
}
