package _4.staff_management.service;

import _4.staff_management.model.Payroll;
import _4.staff_management.repository.PayrollRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PayrollService {

    private final PayrollRepository repository;

    public PayrollService(PayrollRepository repository) {
        this.repository = repository;
    }

    public List<Payroll> getAllPayrolls() {
        return repository.findAll();
    }

    public Payroll getPayrollById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void savePayroll(Payroll payroll) {
        repository.save(payroll);
    }

    public void deletePayroll(Long id) {
        repository.deleteById(id);
    }
}

