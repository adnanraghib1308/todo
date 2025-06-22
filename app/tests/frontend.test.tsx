import "@testing-library/jest-dom/vitest"
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import React from 'react';
import {Button} from '../components/Button'
import PriorityBadge from "../components/PriorityBadge";
import SortControls from "../components/SortControls";

describe('Button', () => {
  it('renders children', () => {
    render(<Button label='yoo'  onClick={() => {}}/>)
    expect(screen.getByText('yoo')).toBeInTheDocument()
  })
})

describe('PriorityBadge', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders High priority badge', () => {
    render(<PriorityBadge priority="HIGH" />)
    expect(screen.getByText('High')).toBeInTheDocument()
    const badge = screen.getByText('High').closest('span')
    expect(badge).toHaveClass('bg-red-100')
    expect(badge).toHaveClass('text-red-800')
  })

  it('renders Medium priority badge', () => {
    render(<PriorityBadge priority="MEDIUM" />)
    expect(screen.getByText('Medium')).toBeInTheDocument()
    const badge = screen.getByText('Medium').closest('span')
    expect(badge).toHaveClass('bg-yellow-100')
    expect(badge).toHaveClass('text-yellow-800')
  })

  it('renders Low priority badge', () => {
    render(<PriorityBadge priority="LOW" />)
    expect(screen.getByText('Low')).toBeInTheDocument()
    const badge = screen.getByText('Low').closest('span')
    expect(badge).toHaveClass('bg-green-100')
    expect(badge).toHaveClass('text-green-800')
  })

  it('applies custom className', () => {
    render(<PriorityBadge priority="HIGH" className="custom-class" />)
    const badge = screen.getByTestId('priority-badge')
    expect(badge).toHaveClass('custom-class')
  })
})

describe("Sort Controls", () => {
    vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react')
  return {
    ...actual,
    Form: (props: any) => <form {...props} />,
  }
})
afterEach(() => {
    cleanup()
  })
    it("Renders sort component", () => {
        render(<SortControls currentSort="priority-desc" />)
        expect(screen.getByText("High → Low")).toBeInTheDocument()
        expect(screen.getByText("Low → High")).toBeInTheDocument()
    })
    it('highlights the correct button for priority-desc', () => {
    render(<SortControls currentSort="priority-desc" />)
    const highBtn = screen.getByText('High → Low')
    const lowBtn = screen.getByText('Low → High')
    expect(highBtn).toHaveClass('bg-blue-500')
    expect(lowBtn).not.toHaveClass('bg-blue-500')
  })

  it('highlights the correct button for priority-asc', () => {
    render(<SortControls currentSort="priority-asc" />)
    const highBtn = screen.getByText('High → Low')
    const lowBtn = screen.getByText('Low → High')
    expect(lowBtn).toHaveClass('bg-blue-500')
    expect(highBtn).not.toHaveClass('bg-blue-500')
  })
})