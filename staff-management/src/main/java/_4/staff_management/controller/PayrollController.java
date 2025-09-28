package _4.staff_management.controller;

import _4.staff_management.model.Payroll;
import _4.staff_management.repository.PayrollRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Controller
@RequestMapping("/payroll")
public class PayrollController {

    private final PayrollRepository repo;

    public PayrollController(PayrollRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public String listPayroll(Model model) {
        model.addAttribute("payrolls", repo.findAll());
        return "payroll-list";
    }

    @GetMapping("/add")
    public String addForm(Model model) {
        model.addAttribute("payroll", new Payroll());
        return "add-payroll";
    }

    @PostMapping("/add")
    public String savePayroll(@ModelAttribute Payroll payroll) {
        // compute net salary server side
        payroll.setNetSalary(payroll.getBasicSalary() + payroll.getAllowances() - payroll.getDeductions());
        if (payroll.getPayDate() == null) {
            payroll.setPayDate(LocalDate.now());
        }
        repo.save(payroll);
        return "redirect:/payroll";
    }

    @GetMapping("/edit/{id}")
    public String editForm(@PathVariable Long id, Model model) {
        model.addAttribute("payroll", repo.findById(id).orElseThrow());
        return "edit-payroll";
    }

    @PostMapping("/edit/{id}")
    public String updatePayroll(@PathVariable Long id, @ModelAttribute Payroll payroll) {
        payroll.setPayrollId(id);
        payroll.setNetSalary(payroll.getBasicSalary() + payroll.getAllowances() - payroll.getDeductions());
        repo.save(payroll);
        return "redirect:/payroll";
    }

    @GetMapping("/delete/{id}")
    public String deletePayroll(@PathVariable Long id) {
        repo.deleteById(id);
        return "redirect:/payroll";
    }
}
